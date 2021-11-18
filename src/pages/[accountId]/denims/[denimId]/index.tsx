import { Box } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import DenimDetail from '../../../../components/DenimDetail';
import Layout from '../../../../components/Layout';
import { GetDenimQuery } from '../../../../lib/graphql';
import { createGraphqlClient } from '../../../../lib/graphqlClient';

const DenimDetailPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  return (
    <Layout>
      {data.getDenim && (
        <Box marginTop="40px">
          <DenimDetail denim={data.getDenim} />
        </Box>
      )}
    </Layout>
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
