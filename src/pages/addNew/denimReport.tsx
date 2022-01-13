import { useAuth0 } from '@auth0/auth0-react';
import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import DenimReportForm from '../../components/DenimReportForm';
import Layout from '../../components/Layout';
import { COLOR_CODE_INDIGO_BLUE } from '../../config/css';

const AddNewDenimReportPage: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated]);

  return (
    <>
      <NextSeo title="色落ち記録作成" description="色落ち記録作成ページ" />
      <Layout>
        <Heading size="lg" marginTop="40px" color={COLOR_CODE_INDIGO_BLUE}>
          色落ち記録作成
        </Heading>
        <DenimReportForm />
      </Layout>
    </>
  );
};

export default AddNewDenimReportPage;
