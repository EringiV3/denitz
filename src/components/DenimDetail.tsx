import {
  Box,
  Button as ChakraButton,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  FaAngleDown,
  FaCopy,
  FaEdit,
  FaPlus,
  FaTrashAlt,
} from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Button from '../components/Button';
import {
  COLOR_CODE_GRAY,
  COLOR_CODE_INDIGO_BLUE,
  COLOR_CODE_PINK,
  COLOR_CODE_WHITE,
} from '../config/css';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import type { Denim } from '../lib/graphql';
import { queryKeys } from '../utils/queryKeyFactory';
import Avatar from './Avatar';
import DenimReportList from './DenimReportList';

type Props = {
  denim: Denim;
};
const DenimDetail: React.FC<Props> = ({ denim }) => {
  const { client, hasToken } = useGraphqlClient();

  const router = useRouter();

  const toast = useToast();

  const reactQueryClient = useQueryClient();

  const [link, setLink] = useState('');

  const { onCopy } = useClipboard(link);

  const { data: currentUserData } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const deleteDenimMutation = useMutation(
    (id: string) => client.DeleteDenim({ id }),
    {
      onSuccess: () => {
        if (!currentUserData?.getCurrentUser?.accountId) {
          return;
        }
        toast({
          title: 'デニムを削除しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(
          queryKeys.denims(currentUserData.getCurrentUser.accountId)
        );
        router.push(`/${currentUserData.getCurrentUser.accountId}`);
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

  const handleClickCopy = () => {
    onCopy();
    toast({
      title: 'リンクをコピーしました',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

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
    if (!currentUserData?.getCurrentUser?.accountId) {
      return;
    }
    router.push(
      `/${currentUserData.getCurrentUser.accountId}/denims/${denim.id}/edit`
    );
  };

  const handleClickAdd = () => {
    router.push(`/addNew/denimReport?denimId=${denim.id}`);
  };

  const handleClickCreateDenimReport = () => {
    router.push(`/addNew/denimReport?denimId=${denim.id}`);
  };

  const isEditable =
    denim.user?.accountId === currentUserData?.getCurrentUser?.accountId;

  useEffect(() => {
    setLink(window.location.href);
  }, [denim]);

  return (
    <Box>
      {isEditable && (
        <Box display="flex" justifyContent="flex-end">
          <Menu>
            <MenuButton
              as={ChakraButton}
              rightIcon={<FaAngleDown />}
              backgroundColor={COLOR_CODE_PINK}
              color={COLOR_CODE_WHITE}
              _hover={{ backgroundColor: COLOR_CODE_PINK }}
              _focus={{ backgroundColor: COLOR_CODE_PINK }}
              _active={{ backgroundColor: COLOR_CODE_PINK }}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaCopy size="15px" />} onClick={handleClickCopy}>
                リンクをコピー
              </MenuItem>
              <MenuItem icon={<FaPlus size="15px" />} onClick={handleClickAdd}>
                色落ち記録を追加
              </MenuItem>
              <MenuItem icon={<FaEdit size="15px" />} onClick={handleClickEdit}>
                編集
              </MenuItem>
              <MenuItem
                icon={<FaTrashAlt size="15px" />}
                onClick={handleClickDelete}
                color="red"
              >
                削除
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
      <Box>
        <Heading size="2xl" color={COLOR_CODE_INDIGO_BLUE}>
          {denim.name}
        </Heading>
        <Box display="flex" marginTop="10px" alignItems="center">
          {denim.user && denim.user.profile && (
            <>
              <NextLink href={`/${denim.user.accountId}`} passHref>
                <Link>
                  <Avatar
                    src={denim.user.profile.iconImageUrl ?? ''}
                    size={30}
                  />
                </Link>
              </NextLink>
              <NextLink href={`/${denim.user.accountId}`} passHref>
                <Link marginLeft="10px" color={COLOR_CODE_GRAY}>
                  {denim.user.profile.name ?? ''}{' '}
                </Link>
              </NextLink>
            </>
          )}
        </Box>
        <Box display="flex" justifyContent="center" marginTop="40px">
          <NextImage
            src={denim.imageUrl ?? ''}
            width="500"
            height="500"
            objectFit="contain"
          />
        </Box>
        <Box marginTop="40px" color={COLOR_CODE_GRAY}>
          {denim.description?.split('\n').map((v, i) => (
            <React.Fragment key={i}>
              {v}
              <br />
            </React.Fragment>
          ))}
        </Box>
        <Heading size="lg" marginTop="40px" color={COLOR_CODE_INDIGO_BLUE}>
          色落ち記録
        </Heading>
        <Box marginBottom="40px">
          {denim.denimReports?.length === 0 ? (
            <Box display="flex" justifyContent="center" marginTop="40px">
              <Button onClick={handleClickCreateDenimReport}>
                色落ち記録を作成する
              </Button>
            </Box>
          ) : (
            denim.denimReports &&
            denim.user?.accountId && (
              <DenimReportList
                denimReportList={denim.denimReports}
                denimId={denim.id}
                accountId={denim.user.accountId}
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DenimDetail;
