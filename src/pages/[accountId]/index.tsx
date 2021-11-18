import { Box, Divider, Heading } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import DenimCard from '../../components/DenimCard';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';
import { GetUserQuery } from '../../lib/graphql';
import { createGraphqlClient } from '../../lib/graphqlClient';

const ProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  return (
    <Layout>
      {data.getUser && data.getUser.profile && (
        <Profile user={data.getUser} profile={data.getUser.profile} />
      )}
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
