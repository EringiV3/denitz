import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import DenimReportForm from '../../components/DenimReportForm';
import Layout from '../../components/Layout';

const AddNewDenimReportPage: React.FC = () => {
  return (
    <>
      <NextSeo title="色落ち記録作成" description="色落ち記録作成ページ" />
      <Layout>
        <Heading size="lg" marginTop="40px">
          色落ち記録作成
        </Heading>
        <DenimReportForm />
      </Layout>
    </>
  );
};

export default AddNewDenimReportPage;
