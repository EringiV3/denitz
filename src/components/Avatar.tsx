import { Avatar as ChakraAvatar, Box } from '@chakra-ui/react';
import NextImage from 'next/image';

type Props = {
  size: number;
  src?: string;
};
const Avatar: React.FC<Props> = ({ size, src }) => {
  return (
    <Box
      borderRadius="50%"
      width={`${size}px`}
      height={`${size}px`}
      overflow="hidden"
    >
      {src ? (
        <NextImage src={src} width={size} height={size} />
      ) : (
        <ChakraAvatar width={size} height={size} />
      )}
    </Box>
  );
};

export default Avatar;
