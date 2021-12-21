import { Avatar as ChakraAvatar, Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import { NEXT_IMAGE_DOMAINS } from '../config/constants';

type Props = {
  size: number;
  src?: string;
};
const Avatar: React.FC<Props> = ({ size, src }) => {
  const srcUrl = src ? new URL(src) : undefined;
  const useNextImage = srcUrl
    ? NEXT_IMAGE_DOMAINS.includes(srcUrl.hostname)
    : false;
  return (
    <Box
      borderRadius="50%"
      width={`${size}px`}
      height={`${size}px`}
      overflow="hidden"
    >
      {useNextImage && src ? (
        <NextImage src={src} width={size} height={size} />
      ) : src ? (
        <ChakraAvatar src={src} width={size} height={size} />
      ) : (
        <ChakraAvatar width={size} height={size} />
      )}
    </Box>
  );
};

export default Avatar;
