import { Box, Heading, Link } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import React from 'react';
import AccountForm from '../../components/AccountForm';
import Layout from '../../components/Layout';

const AccountSettingPage: React.FC = () => {
  return (
    <>
      <NextSeo title="アカウント設定" description="アカウント設定ページ" />
      <Layout>
        <Box>
          <Heading size="md" margin="40px 0 20px 0">
            アカウント設定
          </Heading>
          <Box>
            <AccountForm />
          </Box>
        </Box>
        <Box marginTop="40px">
          <Heading size="md" margin="40px 0 20px 0">
            アカウント削除
          </Heading>
          <Box display="flex" justifyContent="center">
            <NextLink href="/settings/deleteAccount" passHref>
              <Link color="red">アカウントを削除する</Link>
            </NextLink>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default AccountSettingPage;
