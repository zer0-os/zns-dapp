//- React Imports
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//- Web3 Imports
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

//- Library Imports
import { ethers } from 'ethers';
import { AppState } from 'store';
import { useZSaleSdk } from 'lib/hooks/sdk';
import useNotification from 'lib/hooks/useNotification';
import { useBasicController } from 'lib/hooks/useBasicController';
import { Maybe, NftParams, NftStatusCard } from 'lib/types';
import { createDomainMetadata, UploadedDomainMetadata } from 'lib/utils';

//- Store Imports
import { getMinting, getMinted } from 'store/mint/selectors';
import {
	setMintingRequest as reduxSetMintingRequest,
	setMintedRequest as reduxSetMintedRequest,
} from 'store/mint/actions';

//- Constants Imports
import { LABELS } from 'constants/labels';
import { IMAGE_URI } from 'constants/uris';
import { ERRORS } from 'constants/errors';
import { STATUS } from 'constants/status';
import { MINTING_FLOW_NOTIFICATIONS } from 'constants/notifications';

export type UseMintReturn = {
	minting: NftStatusCard[];
	minted: NftStatusCard[];
	mint: (nft: NftParams, setStatus: (status: string) => void) => Promise<void>;
	mintWheels: (
		numWheels: number,
		setStatus: (status: string) => void,
		onFinish: () => void,
		onError: (error: string) => void,
	) => Promise<void>;
	// claimNFT: (
	// 	quantity: number,
	// 	setStatus: (status: string) => void,
	// 	onFinish: () => void,
	// 	onError: (error: string) => void,
	// ) => Promise<void>;
};

const useMintRedux = () => {
	////////////////////////////////
	//   Redux State & Actions    //
	////////////////////////////////
	const dispatch = useDispatch();

	const reduxState = useSelector((state: AppState) => ({
		minting: getMinting(state),
		minted: getMinted(state),
	}));

	const setMinting = useCallback(
		(params: NftStatusCard) => {
			dispatch(reduxSetMintingRequest(params));
		},
		[dispatch],
	);

	const setMinted = useCallback(
		(params: NftStatusCard) => {
			dispatch(reduxSetMintedRequest(params));
		},
		[dispatch],
	);

	const reduxActions = useMemo(
		() => ({
			setMinting,
			setMinted,
		}),
		[setMinting, setMinted],
	);

	return { reduxState, reduxActions };
};

export const useMint = (): UseMintReturn => {
	////////////////////////
	//  Hooks From Out    //
	////////////////////////

	const { addNotification } = useNotification();
	const { instance: zSaleInstance } = useZSaleSdk();
	const { library } = useWeb3React<Web3Provider>();
	const basicController = useBasicController();
	const { reduxState, reduxActions } = useMintRedux();

	////////////////////////////////
	//      Internal Hooks        //
	////////////////////////////////
	const mintWheels = useCallback(
		async (
			numWheels: number,
			setStatus: (status: string) => void,
			onFinish: () => void,
			onError: (error: string) => void,
		) => {
			// Set up default wheel to render
			const wheel = {
				zNA: '',
				title: LABELS.MINT_NFT_DROP_DEFAULT_TITLE,
				imageUri: IMAGE_URI.MINT_NFT_DROP_DEFAULT_IMAGE_URI,
				story: '',
				transactionHash: '',
			};

			if (!zSaleInstance || !library) {
				return;
			}

			//////////////////////////////////////
			// Get approval for the transaction //
			//////////////////////////////////////

			let tx: Maybe<ethers.ContractTransaction>;
			setStatus(STATUS.CONFIRM_WALLET);

			try {
				tx = await zSaleInstance.purchaseDomains(
					ethers.BigNumber.from(numWheels),
					library.getSigner(),
				);
			} catch (e) {
				console.error(e);
				onError(ERRORS.FAILED_TRANSACTION);
				return;
			}

			//////////////////////////
			// Send the transaction //
			//////////////////////////

			setStatus(STATUS.MINTING);

			reduxActions.setMinting(wheel);

			await tx.wait();

			//////////////////////////
			// Transaction complete //
			//////////////////////////

			addNotification(MINTING_FLOW_NOTIFICATIONS.MINT_SUCCESSFUL);

			reduxActions.setMinted(wheel);

			onFinish();
		},
		[reduxActions, addNotification, zSaleInstance, library],
	);

	// const claimNFT = useCallback(
	// 	async (
	// 		quantity: number,
	// 		setStatus: (status: string) => void,
	// 		onFinish: () => void,
	// 		onError: (error: string) => void,
	// 	) => {
	// 		const nft = {
	// 			zNA: '',
	// 			title: LABELS.CLAIM_NFT_DROP_DEFAULT_TITLE,
	// 			imageUri: IMAGE_URI.CLAIM_NFT_DROP_DEFAULT_IMAGE_URI,
	// 			story: '',
	// 			transactionHash: '',
	// 		};

	// 		if (!zSaleInstance || !library) {
	// 			return;
	// 		}

	// 		let tx: Maybe<ethers.ContractTransaction>;
	// 		setStatus(STATUS.PLEASE_APPROVE);

	// 		try {
	// 			tx = await zSaleInstance.purchaseDomains(
	// 				ethers.BigNumber.from(quantity),
	// 				library.getSigner(),
	// 			);
	// 		} catch (e) {
	// 			console.error(e);
	// 			console.log('here');
	// 			onError(ERRORS.FAILED_TRANSACTION);
	// 			setStatus('');
	// 			return;
	// 		}

	// 		reduxActions.setMinting(nft);

	// 		await tx.wait();

	// 		addNotification(MINTING_FLOW_NOTIFICATIONS.REFRESH);
	// 		reduxActions.setMinted(nft);
	// 		onFinish();
	// 	},
	// 	[reduxActions, addNotification, zSaleInstance, library],
	// );

	// TODO: Migrate this once zNS SDK supports minting
	const mint = useCallback(
		async (nft: NftParams, setStatus: (status: string) => void) => {
			// @todo better validation
			if (/[A-Z]/.test(nft.zna)) {
				throw Error(
					`${MINTING_FLOW_NOTIFICATIONS.INVALID_DOMAIN_NAME}Invalid domain name: ${nft.zna} ${MINTING_FLOW_NOTIFICATIONS.INVALID_DOMAIN_NAME}`,
				);
			}

			let tx: Maybe<ethers.ContractTransaction>;

			// get metadata uri
			let metadata: Maybe<UploadedDomainMetadata>;
			setStatus(STATUS.UPLOADING_METADATA);

			try {
				metadata = await createDomainMetadata({
					previewImage: nft.previewImage,
					image: nft.image,
					name: nft.name,
					story: nft.story,
					additionalMetadata: nft.additionalMetadata,
				});
			} catch (e) {
				console.error(e);
				throw Error(ERRORS.FAILED_METADATA_UPLOAD);
			}

			setStatus(STATUS.PENDING_WALLET_APPROVAL);

			tx = await basicController.registerSubdomain({
				parentId: nft.parent,
				label: nft.domain,
				owner: nft.owner,
				isLocked: nft.locked,
				metadataUri: metadata.url,
			});

			addNotification(
				`${MINTING_FLOW_NOTIFICATIONS.STARTED_MINTING} ${nft.name}`,
			);

			const nftStatusCard: NftStatusCard = {
				zNA: nft.zna,
				title: nft.name,
				imageUri: metadata.contents.image,
				story: nft.story,
				transactionHash: tx.hash,
			};

			reduxActions.setMinting(nftStatusCard);

			await tx.wait();

			addNotification(
				`${MINTING_FLOW_NOTIFICATIONS.FINISH_MINTING} ${nftStatusCard.title}.`,
			);

			reduxActions.setMinted(nftStatusCard);
		},
		[reduxActions, addNotification, basicController],
	);

	return useMemo(
		() => ({
			minting: reduxState.minting,
			minted: reduxState.minted,
			mint,
			mintWheels,
			// claimNFT,
		}),
		[
			reduxState,
			mint,
			mintWheels,
			// claimNFT
		],
	);
};

export default useMint;
