import { Box, Heading } from '@chakra-ui/react';
import DenimForm from '../../components/DenimForm';
import Layout from '../../components/Layout';

const AddNewDenimPage: React.FC = () => {
  return (
    <Layout>
      <Heading size="md" margin="40px 0 20px 0">
        デニム追加
      </Heading>
      <Box>
        <DenimForm />
      </Box>
    </Layout>
  );
};

export default AddNewDenimPage;
