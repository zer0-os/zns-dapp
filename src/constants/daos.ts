import { CreateZDAOParams } from '@zero-tech/zdao-sdk/lib/types';
import { NETWORK_TYPES } from 'lib/network';

export const DAOS: { [network in NETWORK_TYPES]: CreateZDAOParams[] } = {
	[NETWORK_TYPES.MAINNET]: [],
	[NETWORK_TYPES.RINKEBY]: [
		{
			zNA: 'one',
			title: 'zDAO Testing 1',
			creator: '0x22C38E74B8C0D1AAB147550BcFfcC8AC544E0D8C',
			network: 4, // for Rinkeby
			safeAddress: '0x7a935d07d097146f143A45aA79FD8624353abD5D',
			votingToken: '0x10F6A2795B14f13771d885D72e5925Aff647B565',
		},
		{
			zNA: 'two',
			title: 'zDAO Testing 2',
			creator: '0x22C38E74B8C0D1AAB147550BcFfcC8AC544E0D8C',
			network: 4, // for Rinkeby
			safeAddress: '0x7a935d07d097146f143A45aA79FD8624353abD5D',
			votingToken: '0x10F6A2795B14f13771d885D72e5925Aff647B565',
		},
		{
			zNA: 'three',
			title: 'zDAO Testing 3',
			creator: '0x22C38E74B8C0D1AAB147550BcFfcC8AC544E0D8C',
			network: 4, // for Rinkeby
			safeAddress: '0x7a935d07d097146f143A45aA79FD8624353abD5D',
			votingToken: '0x10F6A2795B14f13771d885D72e5925Aff647B565',
		},
	],
} as any;
