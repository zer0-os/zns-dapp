//- Types
import { Step } from './AcceptBid.types';

//- Components
import { Member } from 'components';

//- Global Constants
import { CURRENCY } from 'constants/currency';

const TITLES = {
	ZAUCTION_APPROVAL: 'zAuction Approval',
	ACCEPT_BID: 'Accept Bid',
	CONFIRMATION: 'Are you sure?',
	SUCCESS: 'Bid Accepted',
};

export const STEP_TITLES = {
	[Step.CheckingZAuctionApproval]: TITLES.ZAUCTION_APPROVAL,
	[Step.ApproveZAuction]: TITLES.ZAUCTION_APPROVAL,
	[Step.WaitingForWallet]: TITLES.ZAUCTION_APPROVAL,
	[Step.ApprovingZAuction]: TITLES.ZAUCTION_APPROVAL,
	[Step.LoadingData]: TITLES.ACCEPT_BID,
	[Step.Details]: TITLES.ACCEPT_BID,
	[Step.Confirmation]: TITLES.CONFIRMATION,
	[Step.Accepting]: TITLES.ACCEPT_BID,
	[Step.Success]: TITLES.SUCCESS,
};

export const BUTTONS = {
	[Step.Details]: { PRIMARY: 'Accept', SECONDARY: 'Cancel', TERTIARY: 'Retry' },
	[Step.Confirmation]: {
		PRIMARY: 'Confirm',
		SECONDARY: 'Cancel',
		TERTIARY: 'Retry',
	},
	[Step.Success]: 'Finish',
};

export const STATUS_TEXT = {
	CHECK_ZAUCTION: 'Checking status of zAuction approval...',
	ACCEPT_ZAUCTION_PROMPT:
		'Before you can accept a bid, your wallet needs to approve zAuction. You will only need to do this once. This will cost gas.',
	APPROVING_ZAUCTION:
		'Approving zAuction. This may take up to 20 mins... Please do not close this window or refresh the page.',
	AWAITING_APPROVAL: 'Waiting for approval from your wallet...',
	APPROVED: 'Approved',
};

export const ERRORS = {
	SIGNATURE: 'Failed to generate signature.',
	TRANSACTION: 'Transaction failed.',
	LIBRARY: 'Failed to connect with Web3 wallet.',
	CONSOLE_TEXT: 'Failed to check zAuction approval status',
	REJECTED_WALLET: 'Rejected by wallet',
};

export const MESSAGES = {
	TEXT_LOADING: 'Loading Bid Data...',
	TEXT_FAILED_TO_LOAD: 'Failed to load bid data.',
	TEXT_CONFIRMATION:
		'This transaction is about to be seared upon the blockchain. There’s no going back.',
	TEXT_ACCEPT_PROMPT: 'Please accept wallet transaction...',
	TEXT_ACCEPTING_BID: 'Accepting bid. Please wait - transaction is processing.',
	TEXT_CONFIRM_ACCEPT:
		"Are you sure you want to accept this bid? You can't undo this.",
	TEXT_WAITING_FOR_WALLET:
		'Waiting for transaction approval. You should receive a request in your wallet.',
	SUCCESS_CONFIRMATION: 'Success! Bid accepted and ownership transferred',
	CONFIRM_BID_AMOUNT: 'Are you sure you want to accept a bid of',
};

export const getConfirmNFTPriceDetails = (
	bidAmountWild: string,
	bidAmountUsd: string,
) => (
	<div>
		{MESSAGES.CONFIRM_BID_AMOUNT}
		<b>{` ${bidAmountWild}`}</b> {` (${bidAmountUsd + CURRENCY.USD}) `}
	</div>
);

export const getConfirmNFTDomainDetails = (
	domainName: React.ReactNode,
	domainAddress: string,
) => (
	<div>
		and transfer ownership of <b>{domainName}</b> to{' '}
		<b>
			<Member id={domainAddress} />
		</b>
		?
	</div>
);
