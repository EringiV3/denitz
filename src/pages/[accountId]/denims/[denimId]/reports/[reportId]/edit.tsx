import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import EditDenimReportForm from '../../../../../../components/EditDenimReportForm';
import Layout from '../../../../../../components/Layout';
import { COLOR_CODE_INDIGO_BLUE } from '../../../../../../config/css';
import { useGraphqlClient } from '../../../../../../hooks/useGraphqlClient';
import { queryKeys } from '../../../../../../utils/queryKeyFactory';

const EditDenimReportPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { client, hasToken } = useGraphqlClient();
  const denimId = router.query.denimId as string;
  const accountId = router.query.accountId as string;
  const reportId = router.query.reportId as string;

  const { data: currentUserData } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    { staleTime: Infinity, enabled: hasToken }
  );

  const { data: denimReportData } = useQuery(
    queryKeys.denimReport(denimId, reportId),
    () => client.GetDenimReport({ id: reportId }),
    { staleTime: Infinity }
  );

  const isEditable = currentUserData?.getCurrentUser?.accountId === accountId;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    } else if (isAuthenticated && !isEditable) {
      router.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, isEditable]);

  return (
    <>
      <NextSeo title="色落ち記録編集" description="色落ち記録編集ページ" />
      <Layout>
        <Heading
          size="md"
          margin="40px 0 20px 0"
          color={COLOR_CODE_INDIGO_BLUE}
        >
          色落ち記録編集
        </Heading>
        <Box>
          {denimReportData && (
            <EditDenimReportForm
              initialValues={denimReportData.getDenimReport}
              denimId={denimId}
              reportId={reportId}
              accountId={accountId}
            />
          )}
        </Box>
      </Layout>
    </>
  );
};

export default EditDenimReportPage;
