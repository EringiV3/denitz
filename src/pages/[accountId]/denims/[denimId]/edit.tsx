import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading, useToast } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DenimForm from '../../../../components/DenimForm';
import Layout from '../../../../components/Layout';
import { COLOR_CODE_INDIGO_BLUE } from '../../../../config/css';
import { useGraphqlClient } from '../../../../hooks/useGraphqlClient';
import { DenimInput } from '../../../../lib/graphql';
import { queryKeys } from '../../../../utils/queryKeyFactory';

const DenimEditPage: React.FC = () => {
  const router = useRouter();

  const { client, hasToken } = useGraphqlClient();

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

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

  const { data: currentUserData } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    { staleTime: Infinity, enabled: hasToken }
  );

  const isEditable = currentUserData?.getCurrentUser?.accountId === accountId;

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
        reactQueryClient.invalidateQueries(queryKeys.denims(accountId));
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

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    } else if (isAuthenticated && !isEditable) {
      router.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, isEditable]);

  return (
    <>
      <NextSeo title="デニム編集" description="デニム編集ページ" />
      <Layout>
        <Heading
          size="md"
          margin="40px 0 20px 0"
          color={COLOR_CODE_INDIGO_BLUE}
        >
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
