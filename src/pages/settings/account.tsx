import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import AccountForm from '../../components/AccountForm';
import Layout from '../../components/Layout';

const AccountSettingPage: React.FC = () => {
  return (
    <Layout>
      <Heading size="md" margin="40px 0 20px 0">
        アカウント設定
      </Heading>
      <Box>
        <AccountForm />
      </Box>
    </Layout>
  );
};

export default AccountSettingPage;
