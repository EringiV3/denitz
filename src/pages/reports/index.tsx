import { Box, Heading, Spinner } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import Button from '../../components/Button';
import DenimReportCard from '../../components/DenimReportCard';
import Layout from '../../components/Layout';
import { COLOR_CODE_INDIGO_BLUE } from '../../config/css';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { queryKeys } from '../../utils/queryKeyFactory';

// TODO: 色落ち記録一覧ページ実装
const DenimReportsPage: React.FC = () => {
  const router = useRouter();
  const { client } = useGraphqlClient();

  const page = parseInt((router.query.page as string | undefined) ?? '1');

  const PER_PAGE = 10;

  const offset = (page - 1) * PER_PAGE;

  const options = { offset, perPage: PER_PAGE };

  const { data, isLoading } = useQuery(queryKeys.allDenimReports(options), () =>
    client.GetDenimReports({ input: options })
  );

  const hasMore = data && data.getDenimReports.totalCount > page * PER_PAGE;

  const handleClickBack = () => {
    router.push(`/reports?page=${page - 1}`);
  };

  const handleClickNext = () => {
    router.push(`/reports?page=${page + 1}`);
  };

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
          <Heading size="lg" color={COLOR_CODE_INDIGO_BLUE} marginTop="40px">
            色落ち記録一覧
          </Heading>
          {data &&
            data.getDenimReports.denimReports.map((report) => (
              <Box key={report.id} marginTop="20px">
                {report.denim && report.denim.user && (
                  <DenimReportCard
                    showUserInfo={true}
                    denimReport={report}
                    link={`/${report.denim.user.accountId}/denims/${report.denim.id}/reports/${report.id}`}
                  />
                )}
              </Box>
            ))}
          <Box display="flex" justifyContent="space-around" marginTop="40px">
            {page !== 1 && (
              <Button onClick={handleClickBack}>← 前のページへ</Button>
            )}
            {hasMore && (
              <Button onClick={handleClickNext}>次のページへ →</Button>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default DenimReportsPage;
