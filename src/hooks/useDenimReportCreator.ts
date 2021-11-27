import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  backImageState,
  currentStepState,
  denimIdState,
  detailImagesState,
  frontImageState,
} from '../states/denimReportCreator';

export const useDenimReportCreator = () => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
  const resetCurrentStep = useResetRecoilState(currentStepState);
  const resetDenimId = useResetRecoilState(denimIdState);
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
    resetDenimId();
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
