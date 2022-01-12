import {
  Box,
  Button,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaCopy, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  COLOR_CODE_GRAY,
  COLOR_CODE_INDIGO_BLUE,
  COLOR_CODE_PINK,
  COLOR_CODE_WHITE,
} from '../config/css';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { DenimReport } from '../lib/graphql';
import { queryKeys } from '../utils/queryKeyFactory';
import Avatar from './Avatar';

type Props = {
  denimReport: DenimReport;
};
const DenimReport: React.FC<Props> = ({ denimReport }) => {
  const { client, hasToken } = useGraphqlClient();

  const router = useRouter();

  const [link, setLink] = useState('');

  const { onCopy } = useClipboard(link);

  const toast = useToast();

  const reactQueryClient = useQueryClient();

  const deleteDenimReportMutation = useMutation(
    (id: string) => client.DeleteDenimReport({ id }),
    {
      onSuccess: () => {
        if (!denimReport.denim?.id) {
          return;
        }
        if (!denimReport.denim?.user?.accountId) {
          return;
        }
        toast({
          title: '色落ち記録を削除しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(
          queryKeys.denim(denimReport.denim.id)
        );
        router.push(
          `/${denimReport.denim.user.accountId}/denims/${denimReport.denim.id}`
        );
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

  const { data: currentUserData } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const isEditable =
    denimReport.denim?.user?.accountId ===
    currentUserData?.getCurrentUser?.accountId;

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
    deleteDenimReportMutation.mutate(denimReport.id);
  };

  const handleClickEdit = () => {
    if (!denimReport.denim?.user?.accountId) {
      return;
    }
    router.push(
      `/${denimReport.denim.user.accountId}/denims/${denimReport.denim.id}/reports/${denimReport.id}/edit`
    );
  };

  useEffect(() => {
    setLink(window.location.href);
  }, [denimReport]);

  console.log({ denimReport });

  return (
    <Box>
      {isEditable && (
        <Box display="flex" justifyContent="flex-end" marginBottom="20px">
          <Menu>
            <MenuButton
              as={Button}
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
        <Heading size="lg" color={COLOR_CODE_INDIGO_BLUE}>
          {denimReport.title}
        </Heading>
        {denimReport.denim?.user?.profile && (
          <Box color={COLOR_CODE_GRAY} display="flex" alignItems="center">
            投稿者:{' '}
            <Box display="flex" marginLeft="10px" alignItems="center">
              <NextLink href={`/${denimReport.denim.user.accountId}`} passHref>
                <Link>
                  <Avatar
                    src={denimReport.denim.user.profile.iconImageUrl ?? ''}
                    size={30}
                  />
                </Link>
              </NextLink>
              <NextLink href={`/${denimReport.denim.user.accountId}`} passHref>
                <Link marginLeft="10px" color={COLOR_CODE_GRAY}>
                  {denimReport.denim.user.profile.name ?? ''}{' '}
                </Link>
              </NextLink>
            </Box>
          </Box>
        )}
        <Box color={COLOR_CODE_GRAY}>
          デニム:{' '}
          {denimReport.denim?.user?.accountId && denimReport.denim?.id && (
            <NextLink
              href={`/${denimReport.denim.user.accountId}/denims/${denimReport.denim.id}`}
            >
              <Link color={COLOR_CODE_PINK} fontWeight="bold">
                {denimReport.denim.name}
              </Link>
            </NextLink>
          )}
        </Box>
        <Box color={COLOR_CODE_GRAY}>
          作成日: {dayjs(denimReport.createdAt).format('YYYY/MM/DD')}
        </Box>
        <Box color={COLOR_CODE_GRAY}>
          更新日: {dayjs(denimReport.updatedAt).format('YYYY/MM/DD')}
        </Box>
      </Box>
      <Box marginTop="40px">
        <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
          フロント
        </Heading>
        <Box display="flex" justifyContent="center">
          {denimReport.frontImageUrl && (
            <NextImage
              src={denimReport.frontImageUrl}
              width="500"
              height="500"
              objectFit="contain"
            />
          )}
        </Box>
      </Box>
      <Box marginTop="40px">
        {denimReport.backImageUrl && (
          <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
            バック
          </Heading>
        )}
        <Box display="flex" justifyContent="center">
          {denimReport.backImageUrl && (
            <NextImage
              src={denimReport.backImageUrl}
              width="500"
              height="500"
              objectFit="contain"
            />
          )}
        </Box>
      </Box>
      <Box marginTop="40px">
        {denimReport.detailImageUrls &&
          denimReport.detailImageUrls.length !== 0 && (
            <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
              詳細画像
            </Heading>
          )}
        <Box>
          {denimReport.detailImageUrls &&
            denimReport.detailImageUrls.map((image) => (
              <Box
                key={image.id}
                display="flex"
                justifyContent="center"
                marginTop="20px"
              >
                <NextImage
                  src={image.url}
                  width="500"
                  height="500"
                  objectFit="contain"
                />
              </Box>
            ))}
        </Box>
      </Box>
      <Box marginTop="40px">
        <Box color={COLOR_CODE_GRAY}>
          {denimReport.description?.split('\n').map((v, i) => (
            <React.Fragment key={i}>
              {v}
              <br />
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DenimReport;
