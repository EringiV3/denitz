import { Box, Spinner } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/Layout';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { queryKeys } from '../../utils/queryKeyFactory';

// TODO: 色落ち記録一覧ページ実装
const DenimReportsPage: React.FC = () => {
  const { client } = useGraphqlClient();

  const options = { offset: 0, perPage: 10 };

  const { data, isLoading } = useQuery(queryKeys.allDenimReports(options), () =>
    client.GetDenimReports({ input: options })
  );

  return (
    <>
      <NextSeo title="色落ち記録一覧" description="色落ち記録一覧ページ" />
      <Layout>
        <Box>
          {isLoading && (
            <Box>
              <Spinner position="fixed" inset="0" margin="auto" />
            </Box>
          )}
          {data &&
            data.getDenimReports.map((report) => (
              <Box key={report.id}>{report.title}</Box>
            ))}
        </Box>
      </Layout>
    </>
  );
};

export default DenimReportsPage;
