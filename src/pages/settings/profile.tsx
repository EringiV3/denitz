import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/Layout';
import ProfileForm from '../../components/ProfileForm';

const ProfileSetting: React.FC = () => {
  return (
    <>
      <Layout>
        <Heading size="md" margin="40px 0 20px 0">
          プロフィール設定
        </Heading>
        <Box marginBottom="40px">
          <ProfileForm />
        </Box>
      </Layout>
    </>
  );
};

export default ProfileSetting;
