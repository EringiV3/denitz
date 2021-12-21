import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import ProfileForm from '../../components/ProfileForm';

const ProfileSetting: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated]);

  return (
    <>
      <NextSeo title="プロフィール編集" description="プロフィール編集ページ" />
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
