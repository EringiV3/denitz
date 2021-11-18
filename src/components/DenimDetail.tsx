import {
  Avatar,
  Box,
  Button,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaAngleDown, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import type { Denim } from '../lib/graphql';

type Props = {
  denim: Denim;
};
const DenimDetail: React.FC<Props> = ({ denim }) => {
  const { client, hasToken } = useGraphqlClient();

  const router = useRouter();

  const toast = useToast();

  const reactQueryClient = useQueryClient();

  const { data: currentUserData } = useQuery(
    ['currentUser'],
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const deleteDenimMutation = useMutation(
    (id: string) => client.DeleteDenim({ id }),
    {
      onSuccess: () => {
        toast({
          title: 'デニムを削除しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(['denims']);
        router.push(`/${currentUserData?.getCurrentUser?.accountId}`);
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

  const handleClickDelete = () => {
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }
    if (denim.id === undefined) {
      return;
    }
    deleteDenimMutation.mutate(denim.id);
  };

  const handleClickEdit = () => {
    router.push(
      `/${currentUserData?.getCurrentUser?.accountId}/denims/${denim.id}/edit`
    );
  };

  const isEditable =
    denim.user?.accountId === currentUserData?.getCurrentUser?.accountId;

  return (
    <Box>
      {isEditable && (
        <Box display="flex" justifyContent="flex-end">
          <Menu>
            <MenuButton as={Button} rightIcon={<FaAngleDown />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaEdit size="15px" />} onClick={handleClickEdit}>
                編集
              </MenuItem>
              <MenuItem
                icon={<FaTrashAlt size="15px" />}
                onClick={handleClickDelete}
              >
                <Box color="red">削除</Box>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
      <Box>
        <Heading size="2xl">{denim.name}</Heading>
        <Box display="flex" marginTop="10px" alignItems="center">
          <NextLink href={`/${denim.user?.accountId}`} passHref>
            <Link>
              <Avatar src={denim.user?.profile?.iconImageUrl ?? ''} size="sm" />
            </Link>
          </NextLink>
          <NextLink href={`/${denim.user?.accountId}`} passHref>
            <Link marginLeft="10px">{denim.user?.profile?.name ?? ''} </Link>
          </NextLink>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="40px">
          <NextImage
            src={denim.imageUrl ?? ''}
            width="500"
            height="500"
            objectFit="contain"
          />
        </Box>
        <Box marginTop="40px">{denim.description}</Box>
        <Heading size="md" marginTop="40px">
          色落ち記録
        </Heading>
      </Box>
    </Box>
  );
};

export default DenimDetail;
