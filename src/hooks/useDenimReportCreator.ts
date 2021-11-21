import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  croppedBackImageState,
  croppedDetailImageState,
  croppedFrontImageState,
  currentStepState,
  submitDataState,
} from '../states/denimReportCreator';

export const useDenimReportCreator = () => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
  const resetCurrentStep = useResetRecoilState(currentStepState);
  const resetSubmitData = useResetRecoilState(submitDataState);
  const resetCroppedFrontImage = useResetRecoilState(croppedFrontImageState);
  const resetCroppedBackImage = useResetRecoilState(croppedBackImageState);
  const resetCroppedDetailImage = useResetRecoilState(croppedDetailImageState);

  const goToNextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  const backToPreviousStep = () => {
    setCurrentStep((step) => step - 1);
  };

  const reset = () => {
    resetCurrentStep();
    resetSubmitData();
    resetCroppedFrontImage();
    resetCroppedBackImage();
    resetCroppedDetailImage();
  };

  return {
    currentStep,
    goToNextStep,
    backToPreviousStep,
    reset,
  };
};
