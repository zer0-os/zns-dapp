import { ContractAddresses } from './contracts';
import { NETWORK_TYPES } from './network';

// TODO: remove any, fix network types
const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
	[NETWORK_TYPES.MAINNET]: {
		registrar: '0xc2e9678A71e50E5AEd036e00e9c5caeb1aC5987D',
		basic: '0xa05Ae774Da859943B7B859cd2A6aD9F5f1651d6a',
		staking: '0x45b13d8e6579d5C3FeC14bB9998A3640CD4F008D',
		wildToken: '0x2a3bFF78B79A009976EeA096a51A948a3dC00e34',
		lootToken: '0x43b8219aC1883373C0428688eE1a76e19E6B6D9d',
		zAuction: '0x411973Fa81158A4c7767a0D6F7dF62723fDd541F',
		wheelSale: '0x6427CcA6CD4586ec7044Cc138158ba4Eb1633711', //  kicks
		// wheelSale: '0x19a55608f360f6Df69B7932dC2F65EDEFAa88Dc2', //  wheels

		stakeFactory: '0xF133faFd49f4671ac63EE3a3aE7E7C4C9B84cE4a',
		lpToken: '0xcaA004418eB42cdf00cB057b7C9E28f0FfD840a5',
		wildStakingPool: '0x3aC551725ac98C5DCdeA197cEaaE7cDb8a71a2B4',
		lpStakingPool: '0x9E87a268D42B0Aba399C121428fcE2c626Ea01FF',
		// wheelSale: '0x7bA5faff747a3cA7E4ebe65F64e3EDFAEE136846', //  crafts

		// Not yet deployed
		zDao: '0x7701913b65C9bCDa4d353F77EC12123d57D77f1e',
	},
	[NETWORK_TYPES.KOVAN]: {
		registrar: '0xC613fCc3f81cC2888C5Cccc1620212420FFe4931',
		basic: '0x2EF34C52138781C901Fe9e50B64d80aA9903f730',
		staking: '0x1E3F8B31b24EC0E938BE45ecF6971584F90A1602', //$LOOT staking controller
		wildToken: '0x50A0A3E9873D7e7d306299a75Dc05bd3Ab2d251F',
		lootToken: '0xD364C50c33902110230255FE1D730D84FA23e48e',
		zAuction: '0x18A804a028aAf1F30082E91d2947734961Dd7f89',
		wheelSale: '0xE744793F0Bd9FDB2d68a9aDd367d3FfE9E4bcE04', // kicks sale
		// wheelSale: '0xa6A3321b743C31912263090275E24d8b1A50cFE8', // wheelstest2
		// wheelSale: '0xa6A3321b743C31912263090275E24d8b1A50cFE8', // wheelstest2

		// Staking dApp contracts
		stakeFactory: '0x47946797E05A34B47ffE7151D0Fbc15E8297650E',
		lpToken: '0xD364C50c33902110230255FE1D730D84FA23e48e',
		wildStakingPool: '0x4E226a8BbECAa435d2c77D3E4a096F87322Ef1Ae',
		lpStakingPool: '0x9CF0DaD38E4182d944a1A4463c56CFD1e6fa8fE7',
		// wheelSale: '0x946911623663e1526165Cc1eFf37DdE0834e7786', // crafts sale

		// Not yet deployed
		zDao: '',
	},
	[NETWORK_TYPES.RINKEBY]: {
		registrar: '0xa4F6C921f914ff7972D7C55c15f015419326e0Ca',
		basic: '0x1188dD1a0F42BA4a117EF1c09D884f5183D40B28',
		staking: '0x7FDd24f30fB8a3E0021e85Fdb737a3483D3C8135', //$LOOT staking controller
		wildToken: '0x3Ae5d499cfb8FB645708CC6DA599C90e64b33A79',
		zAuction: '0xb2416Aed6f5439Ffa0eCCAaa2b643f3D9828f86B',
		lootToken: '0x5bAbCA2Af93A9887C86161083b8A90160DA068f2',
		wheelSale: '0xC82E9E9B1e28F10a4C13a915a0BDCD4Db00d086d', // Beasts
		// Staking dApp contracts
		stakeFactory: '0xfC4D4b3d4d83f383FA30B2357a956cD718f0C991',
		lpToken: '0x123c1B5A87E4E11663F2604f3EbCAf4ba86e25E1',
		wildStakingPool: '0xb1ABFc6C847a15Cb7FA213363CbACC375b1068A0',
		lpStakingPool: '0x6D3475040CC0F9e48bD916e8559DA5A098eBc613',

		zDao: '0x73D44dEa3A3334aB2504443479aD531FfeD2d2D9',
	},
	// TODO: Update the following with proper contract addresses
	[NETWORK_TYPES.GOERLI]: {
		registrar: '0x009A11617dF427319210e842D6B202f3831e0116',
		basic: '0xd23299F8f0BF17d2d037a12985F83c29A630E6F8',
		staking: '', // left out as staking controller not used anymore
		wildToken: '0x0e46c45f8aca3f89Ad06F4a20E2BED1A12e4658C',
		zAuction: '0xdF0f9F007A38aD25E0c02959374f38719Af5fCf8',
		lootToken: '0x196bc789E03761904E3d7266fa57f2001592D25A',
		wheelSale: '0xFEeDBd2b5c3Ae26fD534275bA68908100B107AF3', // Wapes
		// Staking dApp contracts
		stakeFactory: '0xAeEaC5F790dD98FD7166bBD50d9938Bf542AFeEf',
		lpToken: '0x3Fa5ae3F31D38bCc2cf1dA2394c938dA8a1C9f69',
		wildStakingPool: '0x376030f58c76ECC288a4fce8F88273905544bC07',
		lpStakingPool: '0xCa0F071fcf5b36436F75E422b5Bd23666015b9f9',

		zDao: '0x4d681D8245e956E1cb295Abe870DF6736EA5F70e',
	},
} as any;

export default addresses;
