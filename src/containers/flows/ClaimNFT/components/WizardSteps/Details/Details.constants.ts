export const VIDEO_FORMAT_TYPE = {
	NFT_JPEG: '',
	NFT_WEBM: 'video/webm',
	NFT_MP4: 'video/mp4',
	NFT_OGG: 'video/ogg',
};

export const VIDEO_FORMAT_SRC = {
	[VIDEO_FORMAT_TYPE.NFT_JPEG]: '',
	[VIDEO_FORMAT_TYPE.NFT_WEBM]: '',
	[VIDEO_FORMAT_TYPE.NFT_MP4]: '',
	[VIDEO_FORMAT_TYPE.NFT_OGG]: '',
};

export const VIDEO_SETTINGS = {
	CONTROL_LIST: 'nodownload noremoteplayback noplaybackrate nofullscreen',
	PRELOAD: 'metadata',
};

export const TEXT_INPUT = {
	HEADER:
		'Optional: Enter a Wheel token ID to check if it can be used to claim',
	PLACEHOLDER: 'Token ID',
	BUTTON: 'Check',
	TYPE: 'text',
};

export const TOOLTIP = {
	TEXT_INPUT:
		'You can find the Token ID of a Wheel here in the NFTs app or in the ‘Details’ section on Opensea.',
	UNCLAIMABLE:
		'Your wallet must hold Wilder Wheels with an unused claim to claim a moto.',
	CLAIMABLE:
		'You can claim up to the maximum number of Wheels you hold in this wallet.',
};

export const MESSAGES = {
	CONNECT_WALLET_PROMPT:
		'Connect a wallet which holds Wilder Wheels to claim Motos',
	READ_MORE: 'Read more about claiming',
	COST_PROMPT: 'You only need to pay gas!',
};

export const BUTTONS = {
	CONNECT_WALLET: 'Connect Wallet',
	BUY_WHEELS: 'Buy Wheels',
	START_CLAIMING: 'Start Claiming',
};