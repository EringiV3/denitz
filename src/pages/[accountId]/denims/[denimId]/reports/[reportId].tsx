import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import DenimReport from '../../../../../components/DenimReport';
import Layout from '../../../../../components/Layout';
import { GetDenimReportQuery } from '../../../../../lib/graphql';
import { createGraphqlClient } from '../../../../../lib/graphqlClient';

const DenimReportPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  console.log({ data });
  return (
    <Layout>
      <DenimReport denimReport={data.getDenimReport} />
    </Layout>
  );
};

type ServerSideProps = {
  data: GetDenimReportQuery;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const client = createGraphqlClient();
  const data = await client.GetDenimReport({
    id: context.query.reportId as string,
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

export default DenimReportPage;
