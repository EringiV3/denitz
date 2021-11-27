import { Heading } from '@chakra-ui/react';
import DenimReportForm from '../../components/DenimReportForm';
import Layout from '../../components/Layout';

const AddNewDenimReportPage: React.FC = () => {
  return (
    <Layout>
      <Heading size="lg" marginTop="40px">
        色落ち記録作成
      </Heading>
      <DenimReportForm />
    </Layout>
  );
};

export default AddNewDenimReportPage;
