import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import type { Denim } from '../lib/graphql';

type Props = {
  accountId: string;
  denim: Denim;
};
const DenimCard: React.FC<Props> = ({ denim, accountId }) => {
  console.log({ denim });
  return (
    <LinkBox display="flex" backgroundColor="gray.200">
      <Box width="30%" display="flex">
        <NextImage
          src={denim.imageUrl ?? ''}
          width="500"
          height="500"
          objectFit="contain"
        />
      </Box>
      <Box padding="20px">
        <NextLink href={`/${accountId}/denims/${denim.id}`} passHref>
          <LinkOverlay>
            <Heading size="md">{denim.name}</Heading>
          </LinkOverlay>
        </NextLink>
        <Box marginTop="10px">{denim.description}</Box>
      </Box>
    </LinkBox>
  );
};

export default DenimCard;
