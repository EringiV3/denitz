import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { GetUserQuery } from '../../../lib/graphql';
import { createGraphqlClient } from '../../../lib/graphqlClient';

const DenimDetailPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

type ServerSideProps = {
  data: GetUserQuery;
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
