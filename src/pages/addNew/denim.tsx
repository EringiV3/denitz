import { Box, Heading, useToast } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DenimForm from '../../components/DenimForm';
import Layout from '../../components/Layout';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { DenimInput } from '../../lib/graphql';
import { queryKeys } from '../../utils/queryKeyFactory';

const AddNewDenimPage: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

  const { data } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const router = useRouter();

  const createDenimMutation = useMutation(
    (input: DenimInput) => client.CreateDenim({ input }),
    {
      onSuccess: () => {
        if (!data?.getCurrentUser?.accountId) {
          return;
        }
        toast({
          title: 'デニムを追加しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(
          queryKeys.denims(data.getCurrentUser.accountId)
        );
        router.push(`/${data.getCurrentUser.accountId}`);
      },
      onError: () => {
        toast({
          title: 'エラーが発生しました',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
    }
  );

  return (
    <>
      <NextSeo title="デニム追加" description="デニム追加ページ" />
      <Layout>
        <Heading size="md" margin="40px 0 20px 0">
          デニム追加
        </Heading>
        <Box>
          <DenimForm
            executeMutation={(data) => {
              createDenimMutation.mutate({
                name: data.name,
                description: data.description,
                imageUrl: data.imageUrl,
              });
            }}
            isLoadingMutationResult={createDenimMutation.isLoading}
          />
        </Box>
      </Layout>
    </>
  );
};

export default AddNewDenimPage;
