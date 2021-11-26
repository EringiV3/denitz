import { Box, Heading, Link } from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { DenimReport } from '../lib/graphql';

type Props = {
  denimReport: DenimReport;
};
const DenimReport: React.FC<Props> = ({ denimReport }) => {
  return (
    <Box>
      <Box>
        <Heading size="lg">{denimReport.title}</Heading>
        <Box>
          デニム:{' '}
          <NextLink
            href={`/${denimReport.denim?.user?.accountId}/denims/${denimReport.denim?.id}`}
          >
            <Link color="blue.600">{denimReport.denim?.name}</Link>
          </NextLink>
        </Box>
        <Box>作成日: {dayjs(denimReport.createdAt).format('YYYY/MM/DD')}</Box>
        <Box>更新日: {dayjs(denimReport.updatedAt).format('YYYY/MM/DD')}</Box>
      </Box>
      <Box marginTop="40px">
        <Heading size="md">フロント</Heading>
        <Box display="flex" justifyContent="center">
          {denimReport.frontImageUrl && (
            <NextImage
              src={denimReport.frontImageUrl}
              width="500"
              height="500"
              objectFit="contain"
            />
          )}
        </Box>
      </Box>
      <Box marginTop="40px">
        <Heading size="md">バック</Heading>
        <Box display="flex" justifyContent="center">
          {denimReport.backImageUrl && (
            <NextImage
              src={denimReport.backImageUrl}
              width="500"
              height="500"
              objectFit="contain"
            />
          )}
        </Box>
      </Box>
      <Box marginTop="40px">
        <Heading size="md">詳細画像</Heading>
        <Box>
          {denimReport.detailImageUrls &&
            denimReport.detailImageUrls.map((image) => (
              <Box
                key={image.id}
                display="flex"
                justifyContent="center"
                marginTop="20px"
              >
                <NextImage
                  src={image.url}
                  width="500"
                  height="500"
                  objectFit="contain"
                />
              </Box>
            ))}
        </Box>
      </Box>
      <Box marginTop="40px">{denimReport.description}</Box>
    </Box>
  );
};

export default DenimReport;
