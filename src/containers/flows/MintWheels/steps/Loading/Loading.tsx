// Component Imports
import { Spinner } from 'components';

// Style Imports
import styles from './Loading.module.css';

type LoadingProps = {
	text: string;
};

const Loading = (props: LoadingProps) => {
	return (
		<section className={styles.Container}>
			<span>{props.text}</span>
			<Spinner />
		</section>
	);
};

export default Loading;
