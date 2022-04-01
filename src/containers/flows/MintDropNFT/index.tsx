// React Imports
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Web3 Imports
import { useWeb3React } from '@web3-react/core';
import { useZnsContracts } from 'lib/contracts';
import { Web3Provider } from '@ethersproject/providers';

// Component Imports
import { MintDropNFTBanner, Overlay } from 'components';
import MintDropNFTWizard from './MintDropNFTWizard';

// Library Imports
import { Stage, DropData, TransactionData } from './types';
import { getBannerLabel, getBannerButtonText } from './labels';
import useMint from 'lib/hooks/useMint';
import {
	getDropData,
	getUserEligibility,
	getNumberPurchasedByUser,
	getBalanceEth,
} from './helpers';
import { useZSaleSdk } from 'lib/hooks/sdk';
import useAsyncEffect from 'use-async-effect';

const MintDropNFTFlowContainer = () => {
	// Hardcoded dates
	const DATE_PUBLIC = 1642730400655;

	//////////////////
	// State & Data //
	//////////////////

	const { mintWheels } = useMint();
	const history = useHistory();
	const location = useLocation();

	// Web3 hooks
	const { account, library } = useWeb3React<Web3Provider>();

	// Contracts
	const contracts = useZnsContracts();
	const saleContract = contracts?.wheelSale;
	const wildTokenContract = contracts?.wildToken;

	const { instance: zSaleInstance } = useZSaleSdk();

	// Internal State
	const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
	const [canOpenWizard, setCanOpenWizard] = useState<boolean>(false);
	const [pricePerNFT, setPricePerNFT] = useState<number>(0);
	const [numMinted, setNumMinted] = useState<number>(0);
	const [countdownDate, setCountdownDate] = useState<number | undefined>();
	const [hasCountdownFinished, setHasCountdownFinished] =
		useState<boolean>(false);

	// Auction data
	const [dropStage, setDropStage] = useState<Stage | undefined>();
	const [wheelsTotal, setWheelsTotal] = useState<number | undefined>();
	const [wheelsMinted, setWheelsMinted] = useState<number | undefined>();
	const [maxPurchasesPerUser, setMaxPurchasesPerUser] = useState<
		number | undefined
	>();
	const [failedToLoad, setFailedToLoad] = useState<boolean>(false);
	const [refetch, setRefetch] = useState<number>(0);

	// User data
	const [isUserWhitelisted, setIsUserWhitelisted] = useState<
		boolean | undefined
	>();
	const [balanceEth, setBalanceEth] = useState<number | undefined>();
	const [numberPurchasedByUser, setNumberPurchasedByUser] = useState<
		number | undefined
	>();

	// NOTE: TEMPORARY FOR SALE HALT
	const isSaleHalted = false;

	///////////////
	// Functions //
	///////////////

	const transactionSuccessful = (numWheels: number) => {
		setNumMinted(numMinted + numWheels); // Increment to trigger re-fetch
		setNumberPurchasedByUser(numberPurchasedByUser! + numWheels);
	};

	// Open/close the Mint wizard
	const openWizard = (event: any) => {
		if (event.target.nodeName.toLowerCase() === 'a') {
			return;
		}
		if (isSaleHalted) {
			window?.open('https://discord.gg/7tyggH6eh9', '_blank')?.focus();
			return;
		}
		if (dropStage === Stage.Upcoming || !canOpenWizard || failedToLoad) {
			window?.open('https://discord.gg/mb9fcFey8a', '_blank')?.focus();
		} else if (dropStage === Stage.Sold) {
			history.push('market/kicks.airwild.season1');
		} else {
			setIsWizardOpen(true);
		}
	};

	const closeWizard = () => {
		setIsWizardOpen(false);
	};

	// Toggles to grid view when viewport
	// resizes to below 700px
	const handleResize = () => {
		setCanOpenWizard(window.innerWidth >= 900);
	};

	const countdownFinished = () => {
		setHasCountdownFinished(true);
	};

	// Run a few things after the transaction succeeds
	// const transactionSuccessful = (numWheels: number) => {};

	// Submits transaction, feeds status updates
	// back through the callbacks provided by MintWheels
	const onSubmitTransaction = async (data: TransactionData) => {
		const { numWheels, statusCallback, errorCallback, finishedCallback } = data;
		if (!isSaleHalted) {
			const combinedFinishedCallback = () => {
				transactionSuccessful(numWheels);
				finishedCallback();
			};
			mintWheels(
				numWheels,
				statusCallback,
				combinedFinishedCallback,
				errorCallback,
			);
		} else {
			errorCallback('Sale has ended');
		}
	};

	const openProfile = () => {
		setIsWizardOpen(false);

		const params = new URLSearchParams(location.search);
		params.set('profile', 'true');
		history.push({
			pathname: location.pathname,
			search: params.toString(),
		});
	};

	/////////////
	// Effects //
	/////////////

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// Get sale data
	useEffect(() => {
		let isMounted = true;

		// Generally this would be < DATE_WHITELIST & < DATE_PUBLIC
		// but given time constraints we're just going to compare
		// to DATE_PUBLIC
		if (isSaleHalted) {
			setCountdownDate(DATE_PUBLIC);
			setFailedToLoad(false);
			return;
		}

		const getData = async () => {
			if (!zSaleInstance || !library || !account) {
				return;
			}

			// Get the data related to the drop
			getDropData(zSaleInstance, library, account)
				.then((d) => {
					if (!isMounted) {
						return;
					}
					const primaryData = d as DropData;
					if (primaryData.dropStage === Stage.Upcoming) {
						setCountdownDate(undefined);
						setTimeout(() => {
							setRefetch(refetch + 1);
						}, 7000);
					} else if (primaryData.dropStage === Stage.Whitelist) {
						setCountdownDate(DATE_PUBLIC);
					} else {
						setCountdownDate(undefined);
					}
					if (refetch > 0) {
						setCountdownDate(undefined);
					}
					setDropStage(primaryData.dropStage);
					setWheelsTotal(primaryData.wheelsTotal);
					setWheelsMinted(primaryData.wheelsMinted);
					setMaxPurchasesPerUser(primaryData.maxPurchasesPerUser);
					setFailedToLoad(false);
				})
				.catch((e) => {
					console.error(e);
					console.log('failed to get');
					setRefetch(refetch + 1);
					setFailedToLoad(true);
				});
		};
		getData();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [library, zSaleInstance, isSaleHalted]);

	// Get user eligibility
	useEffect(() => {
		let isMounted = true;
		if (!zSaleInstance || isSaleHalted) {
			return;
		}
		// Get user data if wallet connected
		if (account && library) {
			getUserEligibility(account, zSaleInstance).then((d) => {
				if (isMounted && d !== undefined) {
					setIsUserWhitelisted(d);
				}
			});
		} else {
			setIsUserWhitelisted(undefined);
		}
		return () => {
			isMounted = false;
		};
	}, [account, library, zSaleInstance, isSaleHalted]);

	// Get user balance and number purchased
	useEffect(() => {
		let isMounted = true;
		if (!zSaleInstance || !library || isSaleHalted) {
			return;
		}
		// Get user data if wallet connected
		if (account && library && wildTokenContract) {
			// getERC20TokenBalance(wildTokenContract, account).then((d) => {
			// 	if (isMounted && d !== undefined) {
			// 		setBalanceEth(d);
			// 	}
			// });
			getBalanceEth(library.getSigner()).then((d) => {
				if (isMounted && d !== undefined) {
					setBalanceEth(d);
				}
			});

			getNumberPurchasedByUser(zSaleInstance, library).then((d) => {
				if (isMounted && d !== undefined) {
					setNumberPurchasedByUser(d);
				}
			});
		} else {
			setBalanceEth(undefined);
			setNumberPurchasedByUser(undefined);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numMinted, account, library, zSaleInstance]);

	useEffect(() => {
		let isMounted = true;

		if (!zSaleInstance || isSaleHalted || !library || !account) {
			return;
		}

		getDropData(zSaleInstance, library, account)
			.then((d) => {
				if (!isMounted) {
					return;
				}
				const primaryData = d as DropData;
				if (dropStage !== undefined) {
					if (hasCountdownFinished && primaryData.dropStage === dropStage) {
						setTimeout(() => {
							setRefetch(refetch + 1);
						}, 7000);
						return;
					}
					if (primaryData.dropStage === Stage.Upcoming) {
						setCountdownDate(undefined);
						setTimeout(() => {
							setRefetch(refetch + 1);
						}, 7000);
					} else if (primaryData.dropStage === Stage.Whitelist) {
						setCountdownDate(DATE_PUBLIC);
					} else {
						setCountdownDate(undefined);
					}
					if (refetch > 0) {
						setCountdownDate(undefined);
					}
					setDropStage(primaryData.dropStage);
					setWheelsTotal(primaryData.wheelsTotal);
					setWheelsMinted(primaryData.wheelsMinted);
					setMaxPurchasesPerUser(primaryData.maxPurchasesPerUser);
				}
				if (!isSaleHalted) {
					setFailedToLoad(false);
				}
			})
			.catch((e) => {
				if (!failedToLoad) {
					setTimeout(() => {
						setRefetch(refetch + 1);
					}, 7000);
				}
				setFailedToLoad(true);
			});

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasCountdownFinished, refetch, library, zSaleInstance]);

	useEffect(() => {
		let timer: any;
		if (
			zSaleInstance &&
			(dropStage === Stage.Public || dropStage === Stage.Whitelist) &&
			!isSaleHalted &&
			account &&
			library
		) {
			// Fetch minted count periodically
			timer = setInterval(async () => {
				const sold = await zSaleInstance.getNumberOfDomainsSold(
					library.getSigner(),
				);
				if (sold) setWheelsMinted(sold.toNumber());
			}, 1000);
		}

		return () => {
			timer && clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dropStage, zSaleInstance, isSaleHalted, account, library]);

	useAsyncEffect(async () => {
		if (library) {
			const price = await zSaleInstance.getSalePrice(library.getSigner());
			setPricePerNFT(Number(price));
		}
	}, [zSaleInstance, library]);

	///////////////
	// Fragments //
	///////////////

	const bannerLabel = () => {
		if (isSaleHalted) {
			return (
				<>
					<span>
						Wilder Pets sale has been temporarily paused to ensure a fair sale.
					</span>
					<span style={{ display: 'block', marginTop: 4 }}>
						Join our{' '}
						<b>
							<a
								href={'https://discord.gg/7tyggH6eh9'}
								target={'_blank'}
								rel={'noreferrer'}
							>
								Discord
							</a>
						</b>{' '}
						for more details.
					</span>
				</>
			);
		}
		return failedToLoad
			? 'Failed to load auction data - refresh to try again'
			: getBannerLabel(
					dropStage,
					wheelsMinted,
					wheelsTotal,
					countdownDate,
					countdownFinished,
					hasCountdownFinished,
			  );
	};

	const buttonText = () => {
		return failedToLoad || isSaleHalted
			? 'Learn More'
			: getBannerButtonText(dropStage, canOpenWizard);
	};

	////////////
	// Render //
	////////////

	return (
		<>
			{canOpenWizard && isWizardOpen && !isSaleHalted && (
				<Overlay open onClose={closeWizard}>
					<MintDropNFTWizard
						balanceEth={balanceEth}
						contract={saleContract}
						dropStage={dropStage}
						isUserWhitelisted={isUserWhitelisted}
						maxPurchasesPerUser={maxPurchasesPerUser}
						numberPurchasedByUser={numberPurchasedByUser}
						pricePerNFT={pricePerNFT}
						onClose={closeWizard}
						onFinish={openProfile}
						onSubmitTransaction={onSubmitTransaction}
						userId={account as string | undefined}
						wheelsMinted={wheelsMinted}
						wheelsTotal={wheelsTotal}
						token={wildTokenContract}
					/>
				</Overlay>
			)}
			<div style={{ position: 'relative', marginBottom: 16 }}>
				<MintDropNFTBanner
					title={'Your Metaverse Companion Awaits '}
					label={bannerLabel()}
					buttonText={buttonText()}
					onClick={openWizard}
				/>
			</div>
		</>
	);
};

export default MintDropNFTFlowContainer;