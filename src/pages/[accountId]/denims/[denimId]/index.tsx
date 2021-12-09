import { Box, Spinner } from '@chakra-ui/react';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import DenimDetail from '../../../../components/DenimDetail';
import Layout from '../../../../components/Layout';
import { useGraphqlClient } from '../../../../hooks/useGraphqlClient';
import { GetDenimQuery } from '../../../../lib/graphql';
import { createGraphqlClient } from '../../../../lib/graphqlClient';
import { queryKeys } from '../../../../utils/queryKeyFactory';

const DenimDetailPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ initialData }) => {
  const router = useRouter();
  const { client } = useGraphqlClient();
  const denimId = router.query.denimId as string;
  const accountId = router.query.accountId as string;

  const { data } = useQuery(
    queryKeys.denim(denimId),
    () => client.GetDenim({ id: denimId }),
    { initialData, staleTime: Infinity }
  );

  const denim = data?.getDenim;

  if (!denim) {
    return <Spinner position="fixed" inset="0" margin="auto" />;
  }

  return (
    <>
      <NextSeo
        title={`デニム詳細 - ${data?.getDenim?.name}`}
        description={`${data?.getDenim?.description}`}
        openGraph={{
          type: 'website',
          url: `https://denitz.com/${accountId}/denims/${denim.id}`,
          title: `${denim.name}`,
          description: `${denim.description}`,
          images: [
            {
              url: denim.imageUrl ?? '',
              width: 500,
              height: 500,
              alt: 'denim detail',
            },
          ],
        }}
      />
      <Layout>
        <Box marginTop="40px">
          <DenimDetail denim={denim} />
        </Box>
      </Layout>
    </>
  );
};

type StaticProps = {
  initialData: GetDenimQuery;
};
export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const client = createGraphqlClient();
  const initialData = await client.GetDenim({
    id: params?.denimId as string,
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

export default DenimDetailPage;
