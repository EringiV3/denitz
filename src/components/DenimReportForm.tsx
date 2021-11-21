import { Box, Button, Heading } from '@chakra-ui/react';
import Stepper from '../components/Stepper';
import { useDenimReportCreator } from '../hooks/useDenimReportCreator';

const steps = [
  {
    title: 'デニム選択',
    component: <div>デニム選択</div>,
  },
  {
    title: 'フロント画像選択',
    component: <div>フロント画像選択</div>,
  },
  {
    title: 'バック画像選択',
    component: <div>バック画像選択</div>,
  },
  {
    title: 'ディティール画像選択',
    component: <div>ディティール画像選択</div>,
  },
  {
    title: 'タイトル・説明文',
    component: <div>タイトル・説明文</div>,
  },
];

const DenimReportForm: React.FC = () => {
  const { currentStep, goToNextStep, backToPreviousStep } =
    useDenimReportCreator();

  return (
    <>
      <Box width="100%" marginTop="20px">
        <Stepper stepCount={steps.length} activeStep={currentStep} />
      </Box>
      <Heading size="md" marginTop="20px">
        {steps[currentStep - 1].title}
      </Heading>
      <Box>{steps[currentStep - 1].component}</Box>
      <Box>
        <Button onClick={goToNextStep}>次へ</Button>
        <Button onClick={backToPreviousStep}>戻る</Button>
      </Box>
    </>
  );
};

export default DenimReportForm;
