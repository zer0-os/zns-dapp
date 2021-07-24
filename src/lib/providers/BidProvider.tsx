//- React Imports
import React, { useState, useEffect } from 'react';

//- Library Imports
import { Domain, Bid } from 'lib/types';
import { useZnsContracts } from 'lib/contracts';
import { BigNumber, ethers } from 'ethers';

import * as zAuction from '../zAuction';

//- Hook Imports
import useNotification from 'lib/hooks/useNotification';
import { useWeb3React } from '@web3-react/core';

export const BidContext = React.createContext({
	getBidsForDomain: async (domain: Domain): Promise<Bid[] | undefined> => {
		return;
	},
	getBidsForAccount: async (id: string): Promise<Bid[] | undefined> => {
		return;
	},
	getBidsForYourDomains: async (): Promise<Bid[] | undefined> => {
		return;
	},
	getBidsFromDomainIds: async (ids: string[]): Promise<Bid[] | undefined> => {
		return;
	},
	placeBid: async (
		domain: Domain,
		bid: number,
	): Promise<boolean | undefined> => {
		return;
	},
	acceptBid: async (nftId: string, amount: number): Promise<void> => {
		return;
	},
});

type BidProviderType = {
	children: React.ReactNode;
};

/////////////////////
// Mock data stuff //
/////////////////////

const randomDate = () => {
	const start = new Date(2012, 0, 1);
	const end = new Date();
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime()),
	);
};

// Create some mock bids
export const getMock = (amount: number) => {
	const mockBids: Bid[] = [];
	[...Array(amount)].forEach((a: any) => {
		mockBids.push({
			amount: Math.random() * 10000,
			bidderAccount: `0x${Math.floor(Math.random() * 100000000000000000)}`,
			date: randomDate(),
		});
	});
	// Sort by recent
	return mockBids.sort((a, b) => {
		return b.date.valueOf() - a.date.valueOf();
	});
};

const asyncGetMock = async (amount: number, timeout: number) => {
	await new Promise((resolve) => setTimeout(resolve, timeout));
	return getMock(amount);
};

const BidProvider: React.FC<BidProviderType> = ({ children }) => {
	//////////////////////////
	// Hooks & State & Data //
	//////////////////////////

	const context = useWeb3React();
	const { addNotification } = useNotification();
	const contracts = useZnsContracts();

	const acceptBid = async (nftId: string, amount: number) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			addNotification(`Bid accepted`);
			return;
		} catch (e) {
			console.error(e);
			return;
		}
	};

	const getBidsForYourDomains = async () => {
		try {
			// @zachary
			// return bids from owned domains or undefined
			const mockBids = await asyncGetMock(5, 150);
			return mockBids;
		} catch (e) {
			console.error("Failed to retrieve bids for user's domains");
		}
	};

	const getBidsForAccount = async (id: string) => {
		try {
			const bids = await zAuction.getBidsForAccount(id);

			try {
				const displayBids = bids.map((e) => {
					const amount = Number(ethers.utils.formatEther(e.bidAmount));

					return {
						bidderAccount: id,
						amount,
						date: new Date(), // not supported by zAuction
						tokenId: e.tokenId,
					} as Bid;
				});

				return displayBids;
			} catch (e) {
				console.error('Failed to retrieve bids for user ' + id);
			}
		} catch (e) {
			console.error('Failed to retrieve bids for user ' + id);
			return [];
		}
	};

	const getBidsFromDomainIds = async (ids: string[]) => {
		try {
			const bids = await zAuction.getBidsForNftIds(ids);
			try {
				// @todo remove any type
				const displayBids = bids.map((e: any) => {
					const amount = Number(ethers.utils.formatEther(e.bidAmount));

					return {
						bidderAccount: e.account,
						amount,
						date: new Date(), // not supported by zAuction
					} as Bid;
				});
				return displayBids;
			} catch (e) {
				return [];
			}
		} catch (e) {
			console.error(e);
			return [];
		}
	};

	const getBidsForDomain = async (domain: Domain) => {
		try {
			const bids = await zAuction.getBidsForNft(
				contracts!.registry.address,
				domain.id,
			);

			try {
				// @todo remove any type
				const displayBids = bids.map((e: any) => {
					const amount = Number(ethers.utils.formatEther(e.bidAmount));

					return {
						bidderAccount: e.account,
						amount,
						date: new Date(), // not supported by zAuction
					} as Bid;
				});

				// @TODO: Add filtering expired/invalid bids out
				return displayBids;
			} catch (e) {
				return [];
			}
		} catch (e) {
			console.error('Failed to retrive bids for domain ' + domain.id);
			return [];
		}
	};

	const placeBid = async (domain: Domain, bid: number) => {
		// Replace with bid functionality
		try {
			await zAuction.placeBid(
				context.library!,
				contracts!.registry.address,
				domain.id,
				ethers.utils.parseEther(bid.toString()).toString(),
			);
			addNotification(`Placed ${bid} WILD bid for ${domain.name}`);
			return true;
		} catch (e) {
			console.error(e);
			return;
		}
	};

	const contextValue = {
		acceptBid,
		getBidsForAccount,
		getBidsForDomain,
		getBidsForYourDomains,
		getBidsFromDomainIds,
		placeBid,
	};

	return (
		<BidContext.Provider value={contextValue}>{children}</BidContext.Provider>
	);
};

export default BidProvider;

export function useBidProvider() {
	const {
		acceptBid,
		getBidsForAccount,
		getBidsForDomain,
		getBidsForYourDomains,
		getBidsFromDomainIds,
		placeBid,
	} = React.useContext(BidContext);
	return {
		acceptBid,
		getBidsForAccount,
		getBidsForDomain,
		getBidsForYourDomains,
		getBidsFromDomainIds,
		placeBid,
	};
}
