import { Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';

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

  const createUserAccountMutation = useMutation(
    () => client.CreateUserAccount(),
    {
      onSuccess: (data) => {
        reactQueryClient.setQueryData(['currentUser'], data.createUserAccount);
        router.push(`/${data.createUserAccount.accountId}`);
      },
      onError: () => {
        toast({
          title: 'エラーが発生しました',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
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
      createUserAccountMutation.mutate();
    } else if (data && data.getCurrentUser) {
      router.push(`/${data.getCurrentUser.accountId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <Spinner />;
};

export default Callback;
