import AssetsTable from './AssetsTable/AssetsTable';
import { Asset } from '@zero-tech/zdao-sdk/lib/types';

type AssetsProps = {
	assets?: Asset[];
	isLoading: boolean;
};

const Assets = ({ assets, isLoading }: AssetsProps) => {
	return <AssetsTable assets={assets} isLoading={isLoading} />;
};

export default Assets;
