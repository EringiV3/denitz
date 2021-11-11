import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/dist/client/router';
import { GetProfileQuery } from '../../lib/graphql';
import { createGraphqlClient } from '../../lib/graphqlClient';

const ProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const router = useRouter();
  const { accountId } = router.query;

  console.log({ data });

  return <div>{accountId}</div>;
};

type ServerSideProps = {
  data: GetProfileQuery;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const client = createGraphqlClient();
  const data = await client.GetProfile({
    accountId: context.query.accountId as string,
  });
  return {
    props: {
      data,
    },
  };
};

export default ProfilePage;
