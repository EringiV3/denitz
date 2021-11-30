import { Box } from '@chakra-ui/react';
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

const DenimDetailPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ initialData }) => {
  const router = useRouter();
  const { client } = useGraphqlClient();
  const denimId = router.query.denimId as string;

  const { data } = useQuery(
    ['denims', denimId],
    () => client.GetDenim({ id: denimId }),
    { initialData, staleTime: Infinity }
  );

  return (
    <>
      <NextSeo
        title={`デニム詳細 - ${data?.getDenim?.name}`}
        description={`${data?.getDenim?.description}`}
        openGraph={{
          type: 'website',
          url: `https://denitz.com/${data?.getDenim?.user?.accountId}/denims/${data?.getDenim?.id}`,
          title: `${data?.getDenim?.name}`,
          description: `${data?.getDenim?.description}`,
          images: [
            {
              url: data?.getDenim?.imageUrl ?? '',
              width: 500,
              height: 500,
              alt: 'denim detail',
            },
          ],
        }}
      />
      <Layout>
        {data?.getDenim && (
          <Box marginTop="40px">
            <DenimDetail denim={data.getDenim} />
          </Box>
        )}
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
