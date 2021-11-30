import { Box, Button, Divider, Heading } from '@chakra-ui/react';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import DenimCard from '../../components/DenimCard';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { GetUserQuery } from '../../lib/graphql';
import { createGraphqlClient } from '../../lib/graphqlClient';

const ProfilePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const router = useRouter();
  const { client } = useGraphqlClient();

  const handleClickAddDenim = () => {
    router.push('/addNew/denim');
  };

  const accountId = router.query.accountId as string;

  const { data } = useQuery(
    ['users', accountId],
    () => client.GetUser({ accountId }),
    { initialData, staleTime: Infinity }
  );

  return (
    <>
      <NextSeo
        title={`${data?.getUser?.profile?.name}(@${data?.getUser?.accountId}) のプロフィール`}
        description={`${data?.getUser?.profile?.description}`}
        openGraph={{
          type: 'website',
          url: `https://denitz.com/${data?.getUser?.accountId}`,
          title: `${data?.getUser?.profile?.name}(@${data?.getUser?.accountId}) のプロフィール`,
          description: `${data?.getUser?.profile?.name}(@${data?.getUser?.accountId}) のプロフィールページ`,
          images: [
            {
              url: data?.getUser?.profile?.iconImageUrl ?? '',
              width: 500,
              height: 500,
              alt: 'profile icon',
            },
          ],
        }}
      />
      <Layout>
        {data?.getUser && data?.getUser.profile && (
          <Profile user={data?.getUser} profile={data?.getUser.profile} />
        )}
        <Divider marginTop="20px" />
        <Box marginTop="20px">
          <Heading size="md">デニム一覧</Heading>
          {data?.getUser?.denims?.length === 0 ? (
            <Box display="flex" justifyContent="center" marginTop="40px">
              <Button onClick={handleClickAddDenim}>デニムを追加する</Button>
            </Box>
          ) : (
            data?.getUser?.denims?.map(
              (denim) =>
                denim && (
                  <Box marginTop="20px" key={denim?.id}>
                    <DenimCard
                      denim={denim}
                      link={`/${data?.getUser?.accountId}/denims/${denim.id}`}
                    />
                  </Box>
                )
            )
          )}
        </Box>
      </Layout>
    </>
  );
};

type StaticProps = {
  initialData: GetUserQuery;
};
export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const client = createGraphqlClient();
  const initialData = await client.GetUser({
    accountId: params?.accountId as string,
  });
  if (initialData === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialData,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default ProfilePage;
