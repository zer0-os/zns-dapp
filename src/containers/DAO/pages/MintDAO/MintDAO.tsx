import { useMemo, useState } from 'react';
import { Overlay, FutureButton, Wizard } from 'components';
import { useManyClickHandlers } from 'lib/hooks/useManyClickHandlers';
import { useUpdateEffect } from 'lib/hooks/useUpdateEffect';
import useNotification from 'lib/hooks/useNotification';
import { Step, StepStatus, StepWizard, MintData } from './MintDAO.types';
import { ERRORS, SUCCESS } from './MintDAO.constants';
import { formatMintWizard } from './MintDAO.helpers';

export const MintDAO: React.FC = () => {
	const { addNotification } = useNotification();

	const [currentStep, setCurrentStep] = useState<Step>(Step.None);
	const [currentStepStatus, setCurrentStepStatus] = useState<StepStatus>(
		StepStatus.Normal,
	);
	const [currentMintData, setCurrentMintData] = useState<
		MintData | undefined
	>();
	const [error, setError] = useState<string | undefined>();

	const onChangeStep = (step: Step) => () => setCurrentStep(step);

	const onChangeStepStatus = (stepStatus: StepStatus) => () =>
		setCurrentStepStatus(stepStatus);

	const onChangeMintData = (mintData: MintData) => setCurrentMintData(mintData);

	const onClose = () => {
		// prevent closing overlay while the wallet connection or mintingDAO is in progress
		if (currentStepStatus === StepStatus.Normal) {
			setCurrentStep(Step.None);
		}
	};

	/**
	 *
	 * 03/21/0222 Note by Joon:
	 *
	 * These 3 functions are mock functions
	 * So it mocks failure (unlock, mint) by clicking mouse
	 * And it mocks success (unlock, mint) by double clicking mouse
	 *
	 * These functions will be replaced with SDK methods sonce it is ready
	 */
	const onMockStepFailure = (e: React.UIEvent<HTMLElement>) => {
		if (
			(currentStep === Step.Unlock || currentStep === Step.Mint) &&
			currentStepStatus !== StepStatus.Normal
		) {
			setCurrentStepStatus(StepStatus.Normal);
			setError(ERRORS.Transaction);
		}
	};

	const onMockStepSuccess = (e: React.UIEvent<HTMLElement>) => {
		if (currentStep === Step.Unlock) {
			if (currentStepStatus === StepStatus.Confirm) {
				setCurrentStepStatus(StepStatus.Processing);
			} else if (currentStepStatus === StepStatus.Processing) {
				setCurrentStep(Step.Mint);
				setCurrentStepStatus(StepStatus.Normal);
			}
		} else if (currentStep === Step.Mint) {
			if (currentStepStatus === StepStatus.Confirm) {
				setCurrentStepStatus(StepStatus.Processing);
			} else if (currentStepStatus === StepStatus.Processing) {
				setCurrentStep(Step.None);
				addNotification(SUCCESS[currentStep]);
			}
		}
	};

	const onMockStepResponse = useManyClickHandlers(
		onMockStepSuccess, // One clicking mouse is mocking success
		onMockStepFailure, // Double clicking mouse is mocking failure
	);

	const wizard: StepWizard | null = useMemo(
		() =>
			formatMintWizard(
				currentStep,
				currentStepStatus,
				currentMintData,
				error,
				onChangeStep,
				onChangeStepStatus,
				onChangeMintData,
			),
		[currentStep, currentStepStatus, currentMintData, error],
	);

	useUpdateEffect(() => {
		if (currentStep === Step.None) {
			setCurrentStepStatus(StepStatus.Normal);
			setCurrentMintData(undefined);
			setError(undefined);
		}
	}, [currentStep]);

	useUpdateEffect(() => {
		if (currentStepStatus !== StepStatus.Normal) {
			setError(undefined);
		}
	}, [currentStepStatus]);

	return (
		<>
			<FutureButton glow onClick={onChangeStep(Step.Unlock)}>
				Create a new DAO
			</FutureButton>

			{wizard && (
				<Overlay
					open
					onClose={onClose}
					onContentClick={onMockStepResponse}
					hasCloseButton={currentStepStatus === StepStatus.Normal}
				>
					<Wizard header={wizard.title}>{wizard.children}</Wizard>
				</Overlay>
			)}
		</>
	);
};

export default MintDAO;
