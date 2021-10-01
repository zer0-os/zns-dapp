import { Stage } from './types';

const totalLabel = (wheelsMinted: number, wheelsTotal: number) => (
	<b>{wheelsTotal - wheelsMinted} Remaining</b>
);

export const getBannerButtonText = (
	dropStage?: Stage,
	isDesktopBreakpoint?: boolean,
): string => {
	if (!isDesktopBreakpoint) {
		return 'Learn More';
	}
	if (dropStage === Stage.Public || dropStage === Stage.Whitelist) {
		return 'Mint Now';
	}
	if (dropStage === Stage.Sold) {
		return 'See Wheels';
	}

	return 'Learn More';
};

export const getBannerLabel = (
	dropStage?: Stage,
	wheelsMinted?: number,
	wheelsTotal?: number,
): React.ReactNode => {
	if (dropStage === Stage.Upcoming) {
		return <>Wilder Wheels Available on ** date/time **</>;
	}
	if (dropStage === Stage.Whitelist) {
		return (
			<>
				Wilder Wheels now available for whitelisted supporters{' '}
				{totalLabel(wheelsMinted!, wheelsTotal!)}
			</>
		);
	}
	if (dropStage === Stage.Public) {
		return (
			<>
				Minting is now open to everyone, act fast to secure your Wheels!{' '}
				{totalLabel(wheelsMinted!, wheelsTotal!)}
			</>
		);
	}
	if (dropStage === Stage.Sold) {
		return <>All {wheelsTotal} Wheels have been minted</>;
	}
	return <>Loading drop data...</>;
};
