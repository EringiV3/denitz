import { Box } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import DenimDetail from '../../../../components/DenimDetail';
import Layout from '../../../../components/Layout';
import { GetDenimQuery } from '../../../../lib/graphql';
import { createGraphqlClient } from '../../../../lib/graphqlClient';

const DenimDetailPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  return (
    <>
      <NextSeo
        title={`デニム詳細 - ${data.getDenim?.name}`}
        description={`${data.getDenim?.description}`}
        openGraph={{
          type: 'website',
          url: `https://denitz.com/${data.getDenim?.user?.accountId}/denims/${data.getDenim?.id}`,
          title: `${data.getDenim?.name}`,
          description: `${data.getDenim?.description}`,
          images: [
            {
              url: data.getDenim?.imageUrl ?? '',
              width: 500,
              height: 500,
              alt: 'denim detail',
            },
          ],
        }}
      />
      <Layout>
        {data.getDenim && (
          <Box marginTop="40px">
            <DenimDetail denim={data.getDenim} />
          </Box>
        )}
      </Layout>
    </>
  );
};

type ServerSideProps = {
  data: GetDenimQuery;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const client = createGraphqlClient();
  const data = await client.GetDenim({
    id: context.query.denimId as string,
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

export default DenimDetailPage;
