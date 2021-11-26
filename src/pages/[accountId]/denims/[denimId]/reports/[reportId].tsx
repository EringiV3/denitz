import { Box, Link } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import DenimReport from '../../../../../components/DenimReport';
import Layout from '../../../../../components/Layout';
import { GetDenimReportQuery } from '../../../../../lib/graphql';
import { createGraphqlClient } from '../../../../../lib/graphqlClient';

const DenimReportPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const currentReportIndex = data.getDenimReport.denim?.denimReports?.findIndex(
    (report) => report.id === data.getDenimReport.id
  );
  const previousReport =
    currentReportIndex !== undefined && data.getDenimReport.denim?.denimReports
      ? data.getDenimReport.denim.denimReports[currentReportIndex - 1]
      : null;
  const nextReport =
    currentReportIndex !== undefined && data.getDenimReport.denim?.denimReports
      ? data.getDenimReport.denim.denimReports[currentReportIndex + 1]
      : null;

  return (
    <Layout>
      <Box marginTop="40px">
        <DenimReport denimReport={data.getDenimReport} />
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
            href={`/${data.getDenimReport.denim?.user?.accountId}/denims/${data.getDenimReport.denim?.id}/reports/${previousReport.id}`}
            passHref
          >
            <Link color="blue.500" display="flex" alignItems="center">
              <FaAngleLeft size="20px" /> {previousReport.title}
            </Link>
          </NextLink>
        )}
        {nextReport && (
          <NextLink
            href={`/${data.getDenimReport.denim?.user?.accountId}/denims/${data.getDenimReport.denim?.id}/reports/${nextReport.id}`}
            passHref
          >
            <Link color="blue.500" display="flex" alignItems="center">
              {nextReport.title} <FaAngleRight size="20px" />
            </Link>
          </NextLink>
        )}
      </Box>
    </Layout>
  );
};

type ServerSideProps = {
  data: GetDenimReportQuery;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const client = createGraphqlClient();
  const data = await client.GetDenimReport({
    id: context.query.reportId as string,
  });
  if (data === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default DenimReportPage;
