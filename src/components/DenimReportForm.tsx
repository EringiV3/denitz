import { Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Stepper from '../components/Stepper';
import { useDenimReportCreator } from '../hooks/useDenimReportCreator';
import { denimIdState } from '../states/denimReportCreator';
import SelectBackImageStep from './SelectBackImageStep';
import SelectDenimStep from './SelectDenimStep';
import SelectDetailImagesStep from './SelectDetailImagesStep';
import SelectFrontImageStep from './SelectFrontImageStep';
import TitleDescriptionStep from './TitleDescriptionStep';

const steps = [
  {
    title: 'デニム選択',
    component: <SelectDenimStep />,
  },
  {
    title: 'フロント画像選択',
    component: <SelectFrontImageStep />,
  },
  {
    title: 'バック画像選択',
    component: <SelectBackImageStep />,
  },
  {
    title: 'ディティール画像選択',
    component: <SelectDetailImagesStep />,
  },
  {
    title: 'タイトル・説明文',
    component: <TitleDescriptionStep />,
  },
];

const DenimReportForm: React.FC = () => {
  const router = useRouter();
  const { denimId } = router.query;

  const setDenimId = useSetRecoilState(denimIdState);

  const { currentStep, reset, goToNextStep } = useDenimReportCreator();

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof denimId === 'string') {
      setDenimId(denimId);
      goToNextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [denimId]);

  return (
    <>
      <Box width="100%" marginTop="20px">
        <Stepper stepCount={steps.length} activeStep={currentStep} />
      </Box>
      <Heading size="md" marginTop="40px">
        {steps[currentStep - 1].title}
      </Heading>
      <Box>{steps[currentStep - 1].component}</Box>
    </>
  );
};

export default DenimReportForm;
