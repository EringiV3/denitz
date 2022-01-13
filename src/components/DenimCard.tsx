import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  COLOR_CODE_GRAY,
  COLOR_CODE_INDIGO_BLUE,
  COLOR_CODE_WHITE,
} from '../config/css';
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
      backgroundColor={COLOR_CODE_WHITE}
      borderRadius="15px"
      overflow="hidden"
      border={showBorder ? `3px solid ${COLOR_CODE_INDIGO_BLUE}` : undefined}
    >
      <Box width="30%" display="flex">
        {denim.imageUrl && (
          <NextImage
            src={denim.imageUrl}
            width="250"
            height="250"
            objectFit="contain"
          />
        )}
      </Box>
      <Box padding="20px" flex="1">
        {link ? (
          <NextLink href={link} passHref>
            <LinkOverlay>
              <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
                {denim.name}
              </Heading>
            </LinkOverlay>
          </NextLink>
        ) : (
          <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
            {denim.name}
          </Heading>
        )}
        <Box
          marginTop="10px"
          display={['none', 'block']}
          color={COLOR_CODE_GRAY}
        >
          {formatText(denim.description ?? '', 100)}
        </Box>
      </Box>
    </LinkBox>
  );
};

export default DenimCard;
