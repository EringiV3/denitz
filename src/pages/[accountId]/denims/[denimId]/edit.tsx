import { Box, Heading, useToast } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DenimForm from '../../../../components/DenimForm';
import Layout from '../../../../components/Layout';
import { useGraphqlClient } from '../../../../hooks/useGraphqlClient';
import { DenimInput } from '../../../../lib/graphql';
import { queryKeys } from '../../../../utils/queryKeyFactory';

const DenimEditPage: React.FC = () => {
  const { client, hasToken } = useGraphqlClient();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

  const router = useRouter();

  const denimId = router.query.denimId as string;

  const accountId = router.query.accountId as string;

  const { data } = useQuery(
    queryKeys.denim(denimId),
    () => client.GetDenim({ id: denimId }),
    {
      enabled: !!denimId,
    }
  );

  const denim = data?.getDenim;

  const updateDenimMutation = useMutation(
    (input: DenimInput) => client.UpdateDenim({ id: denimId, input }),
    {
      onSuccess: () => {
        toast({
          title: 'デニムを更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(queryKeys.denim(denimId));
        router.push(`/${accountId}/denims/${denimId}`);
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
      <NextSeo title="デニム編集" description="デニム編集ページ" />
      <Layout>
        <Heading size="md" margin="40px 0 20px 0">
          デニム編集
        </Heading>
        <Box>
          {denim && (
            <DenimForm
              initialValues={{
                name: denim.name ?? '',
                description: denim.description ?? '',
                imageUrl: denim.imageUrl ?? '',
              }}
              executeMutation={(data) => {
                updateDenimMutation.mutate({
                  name: data.name,
                  description: data.description,
                  imageUrl: data.imageUrl,
                });
              }}
              isLoadingMutationResult={updateDenimMutation.isLoading}
            />
          )}
        </Box>
      </Layout>
    </>
  );
};

export default DenimEditPage;
