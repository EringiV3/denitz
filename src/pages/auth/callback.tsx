import { Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { ProfileInput, UserInput } from '../../lib/graphql';

const Callback: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();
  const reactQueryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  const { data, refetch } = useQuery(
    ['currentUser'],
    () => client.GetCurrentUser(),
    { enabled: false }
  );

  const createUserMutation = useMutation(
    (input: UserInput) => client.CreateUser({ input }),
    {
      onSuccess: (data) => {
        reactQueryClient.setQueryData(['currentUser'], data.createUser);
      },
      onError: () => {
        toast({
          title: 'エラーが発生しました',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const createProfileMutation = useMutation(
    (input: ProfileInput) => client.CreateProfile({ input }),
    {
      onSuccess: (data) => {
        reactQueryClient.setQueryData(
          ['profile', data.createProfile.user?.accountId],
          data.createProfile
        );
      },
      onError: () => {
        toast({
          title: 'エラーが発生しました',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  useEffect(() => {
    if (hasToken) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken]);

  useEffect(() => {
    // ユーザーデータが存在しない場合は作成する
    if (data && data.getCurrentUser === null) {
      createUserMutation.mutate({ accountId: 'eringiv3' });
      createProfileMutation.mutate({});
    } else if (data && data.getCurrentUser) {
      router.push(`/${data.getCurrentUser.accountId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (
      createUserMutation.isSuccess &&
      createProfileMutation.isSuccess &&
      createUserMutation.data
    ) {
      router.push(`/${createUserMutation.data.createUser.accountId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createUserMutation.isSuccess,
    createProfileMutation.isSuccess,
    createUserMutation.data,
  ]);

  return <Spinner />;
};

export default Callback;
