import { Box, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DenimForm from '../../components/DenimForm';
import Layout from '../../components/Layout';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { DenimInput } from '../../lib/graphql';

const AddNewDenimPage: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

  const { data } = useQuery(['currentUser'], () => client.GetCurrentUser(), {
    enabled: hasToken,
  });

  const router = useRouter();

  const createDenimMutation = useMutation(
    (input: DenimInput) => client.CreateDenim({ input }),
    {
      onSuccess: () => {
        toast({
          title: 'デニムを追加しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(['denims']);
        router.push(`/${data?.getCurrentUser?.accountId}`);
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
  );
};

export default AddNewDenimPage;
