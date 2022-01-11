import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@chakra-ui/react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../components/Button';
import DenimReportCard from '../components/DenimReportCard';
import Layout from '../components/Layout';
import { COLOR_CODE_INDIGO_BLUE } from '../config/css';
import { GetDenimReportsQuery } from '../lib/graphql';
import { createGraphqlClient } from '../lib/graphqlClient';

const IndexPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const router = useRouter();
  const { loginWithRedirect } = useAuth0();

  const handleClickButton = () => {
    loginWithRedirect();
  };

  const handleClickViewMore = () => {
    router.push('/reports');
  };

  return (
    <Layout>
      <Box color={COLOR_CODE_INDIGO_BLUE} marginTop="40px">
        <Box>
          <Box textAlign="center" fontSize="4xl" fontWeight="bold">
            ジーンズの色落ちを記録・共有できる
          </Box>
          <Box textAlign="center" fontSize="6xl" fontWeight="bold">
            Denitz
          </Box>
          <Box display="flex" justifyContent="center" marginTop="40px">
            <Button onClick={handleClickButton} width="50%">
              新規登録
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="40px">
            <NextImage
              src="/assets/lp_top.jpg"
              width="500"
              height="800"
              objectFit="contain"
            />
          </Box>
        </Box>
        <Box>
          <Box
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            marginTop="40px"
          >
            最新色落ち記録投稿
          </Box>
          <Box marginTop="20px">
            {initialData.getDenimReports.denimReports.map((report) => (
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
            <Box display="flex" justifyContent="center" marginTop="40px">
              <Button onClick={handleClickViewMore}>もっと見る</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default IndexPage;

type StaticProps = {
  initialData: GetDenimReportsQuery;
};
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const client = createGraphqlClient();
  const initialData = await client.GetDenimReports({
    input: {
      offset: 0,
      perPage: 5,
    },
  });
  return {
    props: {
      initialData,
    },
    revalidate: 60,
  };
};
