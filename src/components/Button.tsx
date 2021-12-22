import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import { COLOR_CODE_PINK, COLOR_CODE_WHITE } from '../config/css';

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor={COLOR_CODE_PINK}
      color={COLOR_CODE_WHITE}
      _hover={{ backgroundColor: COLOR_CODE_PINK }}
      _focus={{ backgroundColor: COLOR_CODE_PINK }}
      _active={{ backgroundColor: COLOR_CODE_PINK }}
      {...props}
    />
  );
};

export default Button;
