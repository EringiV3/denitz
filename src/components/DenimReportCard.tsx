import { Box, Heading, Link, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  COLOR_CODE_GRAY,
  COLOR_CODE_INDIGO_BLUE,
  COLOR_CODE_WHITE,
} from '../config/css';
import type { DenimReport } from '../lib/graphql';
import { formatText } from '../utils/stringHelpers';
import Avatar from './Avatar';

type Props = {
  denimReport: DenimReport;
  link?: string;
  showUserInfo?: boolean;
};
const DenimReportCard: React.FC<Props> = ({
  denimReport,
  link,
  showUserInfo = false,
}) => {
  return (
    <LinkBox
      display="flex"
      backgroundColor={COLOR_CODE_WHITE}
      borderRadius="15px"
      overflow="hidden"
    >
      <Box width="30%" display="flex">
        {denimReport.frontImageUrl && (
          <NextImage
            src={denimReport.frontImageUrl}
            width="300"
            height="300"
            objectFit="contain"
          />
        )}
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
        {denimReport.denim && <Box>デニム: {denimReport.denim.name}</Box>}
        {showUserInfo &&
          denimReport.denim &&
          denimReport.denim.user &&
          denimReport.denim.user.profile && (
            <Box display="flex" alignItems="center" marginTop="10px">
              <NextLink href={`/${denimReport.denim.user.accountId}`} passHref>
                <Link>
                  <Avatar
                    src={denimReport.denim.user.profile.iconImageUrl ?? ''}
                    size={30}
                  />
                </Link>
              </NextLink>
              <NextLink href={`/${denimReport.denim.user.accountId}`} passHref>
                <Link marginLeft="10px" color={COLOR_CODE_GRAY}>
                  {denimReport.denim.user.profile.name ?? ''}{' '}
                </Link>
              </NextLink>
            </Box>
          )}
        <Box
          marginTop="10px"
          display={['none', 'block']}
          color={COLOR_CODE_GRAY}
        >
          {formatText(denimReport.description ?? '', 100)}
        </Box>
      </Box>
    </LinkBox>
  );
};

export default DenimReportCard;
