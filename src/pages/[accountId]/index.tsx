import { Avatar, Box, Button, Divider, Heading, Link } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FaInstagram, FaLink, FaTwitter } from 'react-icons/fa';
import DenimCard from '../../components/DenimCard';
import Layout from '../../components/Layout';
import { INSTAGRAM_URL, TWITTER_URL } from '../../config/constants';
import { GetUserQuery } from '../../lib/graphql';
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
        <Avatar
          src={data.getUser?.profile?.iconImageUrl ?? undefined}
          size="xl"
        />
        <Button onClick={handleClickEdit}>編集する</Button>
      </Box>
      <Box marginTop="10px">
        <Heading size="lg">{data.getUser?.profile?.name}</Heading>
        <Box color="gray.600">@{data.getUser?.accountId}</Box>
      </Box>
      <Box marginTop="10px">{data.getUser?.profile?.description}</Box>
      <Box
        display="flex"
        width="30%"
        justifyContent="space-around"
        marginTop="20px"
      >
        {data.getUser?.profile?.twitterUserName &&
          data.getUser?.profile.twitterUserName !== '' && (
            <Link
              isExternal
              href={`${TWITTER_URL}/${data.getUser?.profile.twitterUserName}`}
            >
              <FaTwitter size="25px" />
            </Link>
          )}
        {data.getUser?.profile?.instagramUserName &&
          data.getUser?.profile.instagramUserName !== '' && (
            <Link
              isExternal
              href={`${INSTAGRAM_URL}/${data.getUser?.profile.instagramUserName}`}
            >
              <FaInstagram size="25px" />
            </Link>
          )}
        {data.getUser?.profile?.websiteUrl &&
          data.getUser?.profile.websiteUrl !== '' && (
            <Link isExternal href={data.getUser?.profile.websiteUrl}>
              <FaLink size="25px" />
            </Link>
          )}
      </Box>
      <Divider marginTop="20px" />
      <Box marginTop="20px">
        <Heading size="md">デニム一覧</Heading>
        {data.getUser?.denims?.map(
          (denim) =>
            denim && (
              <Box marginTop="20px">
                <DenimCard
                  key={denim?.id}
                  denim={denim}
                  accountId={data.getUser?.accountId ?? ''}
                />
              </Box>
            )
        )}
      </Box>
    </Layout>
  );
};

type ServerSideProps = {
  data: GetUserQuery;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const client = createGraphqlClient();
  const data = await client.GetUser({
    accountId: context.query.accountId as string,
  });
  if (data === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default ProfilePage;
