import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import type { DenimReport } from '../lib/graphql';

type Props = {
  denimReport: DenimReport;
  link?: string;
};
const DenimReportCard: React.FC<Props> = ({ denimReport, link }) => {
  return (
    <LinkBox
      display="flex"
      backgroundColor="gray.200"
      borderRadius="15px"
      overflow="hidden"
    >
      <Box width="30%" display="flex">
        <NextImage
          src={denimReport.frontImageUrl ?? ''}
          width="500"
          height="500"
          objectFit="contain"
        />
      </Box>
      <Box padding="20px" flex="1">
        {link ? (
          <NextLink href={link} passHref>
            <LinkOverlay>
              <Heading size="md">{denimReport.title}</Heading>
            </LinkOverlay>
          </NextLink>
        ) : (
          <Heading size="md">{denimReport.title}</Heading>
        )}
        <Box marginTop="10px">{denimReport.description}</Box>
      </Box>
    </LinkBox>
  );
};

export default DenimReportCard;
