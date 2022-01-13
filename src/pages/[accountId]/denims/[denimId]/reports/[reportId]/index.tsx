import { Box, Link, Spinner } from '@chakra-ui/react';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useQuery } from 'react-query';
import DenimReport from '../../../../../../components/DenimReport';
import Layout from '../../../../../../components/Layout';
import { COLOR_CODE_PINK } from '../../../../../../config/css';
import { useGraphqlClient } from '../../../../../../hooks/useGraphqlClient';
import { GetDenimReportQuery } from '../../../../../../lib/graphql';
import { createGraphqlClient } from '../../../../../../lib/graphqlClient';
import { queryKeys } from '../../../../../../utils/queryKeyFactory';

const DenimReportPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ initialData }) => {
  const router = useRouter();
  const { client } = useGraphqlClient();
  const reportId = router.query.reportId as string;
  const denimId = router.query.denimId as string;

  const { data } = useQuery(
    queryKeys.denimReport(denimId, reportId),
    () => client.GetDenimReport({ id: reportId }),
    { initialData, staleTime: Infinity }
  );

  const denimReport = data?.getDenimReport;

  const accountId = router.query.accountId as string;

  const currentReportIndex =
    data?.getDenimReport?.denim?.denimReports?.findIndex(
      (report) => report.id === data?.getDenimReport?.id
    );
  const previousReport =
    currentReportIndex !== undefined &&
    data?.getDenimReport?.denim?.denimReports
      ? data.getDenimReport.denim.denimReports[currentReportIndex - 1]
      : null;
  const nextReport =
    currentReportIndex !== undefined &&
    data?.getDenimReport?.denim?.denimReports
      ? data.getDenimReport.denim.denimReports[currentReportIndex + 1]
      : null;

  if (!denimReport) {
    return <Spinner position="fixed" inset="0" margin="auto" />;
  }

  return (
    <>
      <NextSeo
        title={`${denimReport.denim?.name} - ${denimReport.title}`}
        description={`${denimReport.description}`}
        openGraph={{
          type: 'website',
          url: `https://denitz.com/${denimReport.denim?.id}/denims/${denimReport.denim?.id}/reports/${denimReport.id}`,
          title: `${denimReport.denim?.name} - ${denimReport.title}`,
          description: `${denimReport.description}`,
          images: [
            {
              url: denimReport.frontImageUrl ?? '',
              width: 500,
              height: 500,
              alt: 'denim report',
            },
          ],
        }}
      />
      <Layout>
        <Box marginTop="40px">
          <DenimReport denimReport={denimReport} />
        </Box>
        <Box
          display="flex"
          justifyContent={
            previousReport && nextReport
              ? 'space-between'
              : previousReport
              ? 'flex-start'
              : nextReport
              ? 'flex-end'
              : undefined
          }
          marginTop="80px"
          marginBottom="40px"
        >
          {previousReport && (
            <NextLink
              href={`/${accountId}/denims/${denimId}/reports/${previousReport.id}`}
              passHref
            >
              <Link
                color={COLOR_CODE_PINK}
                fontWeight="bold"
                display="flex"
                alignItems="center"
              >
                <FaAngleLeft size="20px" /> {previousReport.title}
              </Link>
            </NextLink>
          )}
          {nextReport && (
            <NextLink
              href={`/${accountId}/denims/${denimId}/reports/${nextReport.id}`}
              passHref
            >
              <Link
                color={COLOR_CODE_PINK}
                fontWeight="bold"
                display="flex"
                alignItems="center"
              >
                {nextReport.title} <FaAngleRight size="20px" />
              </Link>
            </NextLink>
          )}
        </Box>
      </Layout>
    </>
  );
};

type StaticProps = {
  initialData: GetDenimReportQuery;
};
export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const client = createGraphqlClient();
  const initialData = await client.GetDenimReport({
    id: params?.reportId as string,
  });
  if (initialData.getDenimReport === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialData,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default DenimReportPage;
