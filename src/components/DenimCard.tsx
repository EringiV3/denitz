import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import type { Denim } from '../lib/graphql';
import { formatText } from '../utils/stringHelpers';

type Props = {
  denim: Denim;
  link?: string;
  showBorder?: boolean;
};
const DenimCard: React.FC<Props> = ({ denim, link, showBorder }) => {
  return (
    <LinkBox
      display="flex"
      backgroundColor="gray.200"
      borderRadius="15px"
      overflow="hidden"
      border={showBorder ? '3px solid #2c5282' : undefined}
    >
      <Box width="30%" display="flex">
        <NextImage
          src={denim.imageUrl ?? ''}
          width="500"
          height="500"
          objectFit="contain"
        />
      </Box>
      <Box padding="20px" flex="1">
        {link ? (
          <NextLink href={link} passHref>
            <LinkOverlay>
              <Heading size="md">{denim.name}</Heading>
            </LinkOverlay>
          </NextLink>
        ) : (
          <Heading size="md">{denim.name}</Heading>
        )}
        <Box marginTop="10px" display={['none', 'block']}>
          {formatText(denim.description ?? '', 100)}
        </Box>
      </Box>
    </LinkBox>
  );
};

export default DenimCard;
