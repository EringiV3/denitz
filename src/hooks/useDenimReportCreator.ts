import { useRecoilState } from 'recoil';
import { currentStepState } from '../states/denimReportCreator';

export const useDenimReportCreator = () => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);

  const goToNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  const backToPreviousStep = () => {
    setCurrentStep((step) => step - 1);
  };

  return {
    currentStep,
    goToNextStep,
    backToPreviousStep,
  };
};
