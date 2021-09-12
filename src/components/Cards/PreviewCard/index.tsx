/**
 * Stateful container for PreviewCard.tsx
 */

// React Imports
import { useEffect, useRef, useState } from 'react';

// Library Imports
import { Maybe, Metadata } from 'lib/types';
import { getMetadata } from 'lib/metadata';
import { useHistory } from 'react-router-dom';

// Copmonent Imports
import PreviewCard from './PreviewCard';
import { Overlay, Image } from 'components';

type PreviewCardContainerProps = {
	children?: React.ReactNode;
	creatorId: string;
	disabled: Maybe<boolean>;
	domain: string;
	mvpVersion: number;
	onButtonClick: () => void;
	onImageClick?: () => void;
	ownerId: string;
	style?: React.CSSProperties;
	preventInteraction?: boolean;
	metadataUrl?: string;
};

const PreviewCardContainer: React.FC<PreviewCardContainerProps> = ({
	children,
	creatorId,
	disabled,
	domain,
	mvpVersion,
	onButtonClick,
	onImageClick,
	ownerId,
	style,
	preventInteraction,
	metadataUrl,
}) => {
	const history = useHistory();
	const isMounted = useRef<boolean>();

	const [metadata, setMetadata] = useState<Metadata | undefined>();

	const onViewDomain = () => {
		history.push({
			pathname: domain,
			search: '?view',
		});
	};

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		setMetadata(undefined);
		if (domain === '/' || !metadataUrl) return;
		getMetadata(metadataUrl).then((m) => {
			if (isMounted.current === false || !m) return;
			else setMetadata(m);
		});
	}, [metadataUrl]);

	/////////////////////
	// React Fragments //
	/////////////////////

	return (
		<>
			<PreviewCard
				creatorId={creatorId}
				description={metadata?.description || ''}
				disabled={disabled}
				domain={domain}
				image={metadata?.image || ''}
				isLoading={!metadata}
				mvpVersion={mvpVersion}
				name={metadata?.title || ''}
				onMakeBid={onButtonClick}
				onViewDomain={onViewDomain}
				ownerId={ownerId}
				preventInteraction={preventInteraction}
				style={style}
			>
				{children}
			</PreviewCard>
		</>
	);
};

export default PreviewCardContainer;
