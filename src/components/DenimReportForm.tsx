import { Box, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import Stepper from '../components/Stepper';
import { useDenimReportCreator } from '../hooks/useDenimReportCreator';
import SelectBackImageStep from './SelectBackImageStep';
import SelectDenimStep from './SelectDenimStep';
import SelectDetailImagesStep from './SelectDetailImagesStep';
import SelectFrontImageStep from './SelectFrontImageStep';

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
    component: <div>タイトル・説明文</div>,
  },
];

const DenimReportForm: React.FC = () => {
  const { currentStep, reset } = useDenimReportCreator();

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
