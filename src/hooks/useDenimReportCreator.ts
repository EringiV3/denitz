import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  backImageState,
  currentStepState,
  detailImagesState,
  frontImageState,
  submitDataState,
} from '../states/denimReportCreator';

export const useDenimReportCreator = () => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
  const resetCurrentStep = useResetRecoilState(currentStepState);
  const resetSubmitData = useResetRecoilState(submitDataState);
  const resetFrontImage = useResetRecoilState(frontImageState);
  const resetBackImage = useResetRecoilState(backImageState);
  const resetDetailImage = useResetRecoilState(detailImagesState);

  const goToNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  const backToPreviousStep = () => {
    setCurrentStep((step) => step - 1);
  };

  const reset = () => {
    resetCurrentStep();
    resetSubmitData();
    resetFrontImage();
    resetBackImage();
    resetDetailImage();
  };

  return {
    currentStep,
    goToNextStep,
    backToPreviousStep,
    reset,
  };
};
