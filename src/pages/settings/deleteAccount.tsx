import {
  Box,
  Button,
  Heading,
  ListItem,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useMutation } from 'react-query';
import Layout from '../../components/Layout';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';

const DeleteAccountPage: React.FC = () => {
  const { client } = useGraphqlClient();

  const toast = useToast();

  const deleteUserAccountMutation = useMutation(
    () => client.DeleteUserAccount(),
    {
      onSuccess: () => {
        toast({
          title: 'アカウントを削除しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        // 状態をクリーンアップするためにハードリロード
        location.href = '/';
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

  const handleClick = () => {
    if (
      !window.confirm('これが最後の確認です。本当にアカウントを削除しますか？')
    ) {
      return;
    }

    deleteUserAccountMutation.mutate();
  };

  return (
    <>
      <NextSeo title="アカウント削除" description="アカウント削除ページ" />
      <Layout>
        <Heading
          marginTop="40px"
          size="lg"
          display="flex"
          justifyContent="center"
        >
          アカウントを削除しますか？
        </Heading>
        <Box marginTop="40px">
          <Heading size="md">以下のデータは完全に削除されます</Heading>
          <Box backgroundColor="gray.100" borderRadius="10px" marginTop="20px">
            <UnorderedList padding="10px">
              <ListItem>ユーザーの情報</ListItem>
              <ListItem>デニムの情報</ListItem>
              <ListItem>色落ち記録の情報</ListItem>
            </UnorderedList>
          </Box>
          <Box color="red" marginTop="20px">
            一度アカウントを削除すると上記のデータが削除され、復元することはできません。
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="80px">
          <Button colorScheme="red" onClick={handleClick}>
            アカウントを削除する
          </Button>
        </Box>
      </Layout>
    </>
  );
};

export default DeleteAccountPage;
