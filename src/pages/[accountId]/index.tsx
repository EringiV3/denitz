import { Avatar, Box, Button, Divider, Heading, Link } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FaInstagram, FaLink, FaTwitter } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { INSTAGRAM_URL, TWITTER_URL } from '../../config/constants';
import { GetProfileQuery } from '../../lib/graphql';
import { createGraphqlClient } from '../../lib/graphqlClient';

const ProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const router = useRouter();

  const handleClickEdit = () => {
    router.push('/settings/profile');
  };

  return (
    <Layout>
      <Box marginTop="40px" display="flex" justifyContent="space-between">
        <Avatar src={data.getProfile.iconImageUrl ?? undefined} size="xl" />
        <Button onClick={handleClickEdit}>編集する</Button>
      </Box>
      <Box marginTop="10px">
        <Heading size="lg">{data.getProfile.name}</Heading>
        <Box color="gray.600">@{data.getProfile.user?.accountId}</Box>
      </Box>
      <Box marginTop="10px">{data.getProfile.description}</Box>
      <Box
        display="flex"
        width="30%"
        justifyContent="space-around"
        marginTop="20px"
      >
        {data.getProfile.twitterUserName &&
          data.getProfile.twitterUserName !== '' && (
            <Link
              isExternal
              href={`${TWITTER_URL}/${data.getProfile.twitterUserName}`}
            >
              <FaTwitter size="25px" />
            </Link>
          )}
        {data.getProfile.instagramUserName &&
          data.getProfile.instagramUserName !== '' && (
            <Link
              isExternal
              href={`${INSTAGRAM_URL}/${data.getProfile.instagramUserName}`}
            >
              <FaInstagram size="25px" />
            </Link>
          )}
        {data.getProfile.websiteUrl && data.getProfile.websiteUrl !== '' && (
          <Link isExternal href={data.getProfile.websiteUrl}>
            <FaLink size="25px" />
          </Link>
        )}
      </Box>
      <Divider marginTop="20px" />
    </Layout>
  );
};

type ServerSideProps = {
  data: GetProfileQuery;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const client = createGraphqlClient();
  try {
    const data = await client.GetProfile({
      accountId: context.query.accountId as string,
    });
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default ProfilePage;
