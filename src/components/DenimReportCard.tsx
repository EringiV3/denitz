import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  COLOR_CODE_GRAY,
  COLOR_CODE_INDIGO_BLUE,
  COLOR_CODE_WHITE,
} from '../config/css';
import type { DenimReport } from '../lib/graphql';

type Props = {
  denimReport: DenimReport;
  link?: string;
};
const DenimReportCard: React.FC<Props> = ({ denimReport, link }) => {
  return (
    <LinkBox
      display="flex"
      backgroundColor={COLOR_CODE_WHITE}
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
              <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
                {denimReport.title}
              </Heading>
            </LinkOverlay>
          </NextLink>
        ) : (
          <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
            {denimReport.title}
          </Heading>
        )}
        <Box marginTop="10px" color={COLOR_CODE_GRAY}>
          {denimReport.description}
        </Box>
      </Box>
    </LinkBox>
  );
};

export default DenimReportCard;
