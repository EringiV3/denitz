import { Box, Button, Divider, Heading, Spinner } from '@chakra-ui/react';
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
import { GetProfileQuery } from '../../lib/graphql';
import { createGraphqlClient } from '../../lib/graphqlClient';
import { queryKeys } from '../../utils/queryKeyFactory';

const ProfilePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const router = useRouter();
  const { client, hasToken } = useGraphqlClient();

  const handleClickAddDenim = () => {
    router.push('/addNew/denim');
  };

  const accountId = router.query.accountId as string;

  const { data: currentUserData } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    { staleTime: Infinity, enabled: hasToken }
  );

  const { data } = useQuery(
    queryKeys.profile(accountId),
    () => client.GetProfile({ accountId }),
    { initialData, staleTime: Infinity }
  );

  const { data: denimsData } = useQuery(
    queryKeys.denims(accountId),
    () => client.GetDenims({ accountId }),
    { staleTime: Infinity }
  );

  const profile = data?.getProfile;

  const denims = denimsData?.getDenims ?? [];

  const isEditable = currentUserData?.getCurrentUser?.accountId === accountId;

  if (!profile) {
    return <Spinner position="fixed" inset="0" margin="auto" />;
  }

  return (
    <>
      <NextSeo
        title={`${profile.name}(@${accountId}) のプロフィール`}
        description={`${profile.description}`}
        openGraph={{
          type: 'website',
          url: `https://denitz.com/${accountId}`,
          title: `${profile.name}(@${accountId}) のプロフィール`,
          description: `${profile.name}(@${accountId}) のプロフィールページ`,
          images: [
            {
              url: profile.iconImageUrl ?? '',
              width: 500,
              height: 500,
              alt: 'profile icon',
            },
          ],
        }}
      />
      <Layout>
        <Profile
          accountId={accountId}
          profile={profile}
          isEditable={isEditable}
        />
        <Divider marginTop="20px" />
        <Box margin="20px 0">
          <Heading size="md">デニム一覧</Heading>
          {denims.length === 0 ? (
            <Box display="flex" justifyContent="center" marginTop="40px">
              <Button onClick={handleClickAddDenim}>デニムを追加する</Button>
            </Box>
          ) : (
            denims.map(
              (denim) =>
                denim && (
                  <Box marginTop="20px" key={denim.id}>
                    <DenimCard
                      denim={denim}
                      link={`/${accountId}/denims/${denim.id}`}
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
  initialData: GetProfileQuery;
};
export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const client = createGraphqlClient();
  const initialData = await client.GetProfile({
    accountId: params?.accountId as string,
  });
  if (initialData.getProfile === null) {
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
