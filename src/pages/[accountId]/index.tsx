import { Box, Button, Divider, Heading } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import DenimCard from '../../components/DenimCard';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';
import { GetUserQuery } from '../../lib/graphql';
import { createGraphqlClient } from '../../lib/graphqlClient';

const ProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const router = useRouter();

  const handleClickAddDenim = () => {
    router.push('/addNew/denim');
  };

  return (
    <Layout>
      {data.getUser && data.getUser.profile && (
        <Profile user={data.getUser} profile={data.getUser.profile} />
      )}
      <Divider marginTop="20px" />
      <Box marginTop="20px">
        <Heading size="md">デニム一覧</Heading>
        {data.getUser?.denims?.length === 0 ? (
          <Box display="flex" justifyContent="center" marginTop="40px">
            <Button onClick={handleClickAddDenim}>デニムを追加する</Button>
          </Box>
        ) : (
          data.getUser?.denims?.map(
            (denim) =>
              denim && (
                <Box marginTop="20px" key={denim?.id}>
                  <DenimCard
                    denim={denim}
                    link={`/${data.getUser?.accountId}/denims/${denim.id}`}
                  />
                </Box>
              )
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
