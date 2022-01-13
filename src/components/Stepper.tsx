import { Box } from '@chakra-ui/react';
import { COLOR_CODE_INDIGO_BLUE } from '../config/css';

type Props = {
  stepCount: number;
  activeStep: number;
};
const Stepper: React.FC<Props> = ({ stepCount, activeStep }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      {[...Array(stepCount).keys()].map((_, i) => (
        <Box
          key={i}
          width="30px"
          height="30px"
          color="white"
          fontWeight="bold"
          backgroundColor={
            i + 1 === activeStep ? COLOR_CODE_INDIGO_BLUE : 'gray.300'
          }
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {i + 1}
        </Box>
      ))}
    </Box>
  );
};

export default Stepper;
