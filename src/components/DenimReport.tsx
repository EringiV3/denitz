import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
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
import { useEffect, useState } from 'react';
import { FaAngleDown, FaCopy, FaTrashAlt } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  COLOR_CODE_GRAY,
  COLOR_CODE_INDIGO_BLUE,
  COLOR_CODE_PINK,
  COLOR_CODE_WHITE,
} from '../config/css';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { DenimReport, DenimReportInput } from '../lib/graphql';
import { queryKeys } from '../utils/queryKeyFactory';
import EditableControls from './EditableControls';

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

  const updateDenimRepotMutation = useMutation(
    ({ id, input }: { id: string; input: DenimReportInput }) =>
      client.UpdateDenimReport({ id, input }),
    {
      onSuccess: () => {
        if (!denimReport.denim?.id) {
          return;
        }
        toast({
          title: '色落ち記録を更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(
          queryKeys.denimReport(denimReport.denim.id, denimReport.id)
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

  useEffect(() => {
    setLink(window.location.href);
  }, [denimReport]);

  const handleSubmitTitle = (value: string) => {
    if (denimReport.denim?.id && denimReport.detailImageUrls) {
      updateDenimRepotMutation.mutate({
        id: denimReport.id,
        input: {
          backImageUrl: denimReport.backImageUrl,
          denimId: denimReport.denim.id,
          description: denimReport.description,
          detailImageUrls: denimReport.detailImageUrls.map(
            (image) => image.url
          ),
          frontImageUrl: denimReport.frontImageUrl,
          title: value,
        },
      });
    }
  };

  const handleSubmitDescription = (value: string) => {
    if (denimReport.denim?.id && denimReport.detailImageUrls) {
      updateDenimRepotMutation.mutate({
        id: denimReport.id,
        input: {
          backImageUrl: denimReport.backImageUrl,
          denimId: denimReport.denim.id,
          description: value,
          detailImageUrls: denimReport.detailImageUrls.map(
            (image) => image.url
          ),
          frontImageUrl: denimReport.frontImageUrl,
          title: denimReport.title,
        },
      });
    }
  };

  return (
    <Box>
      {isEditable && (
        <Box display="flex" justifyContent="flex-end">
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
        {isEditable ? (
          <Editable
            marginTop="10px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            defaultValue={denimReport.title ?? ''}
            fontSize="2xl"
            fontWeight="bold"
            fontFamily="heading"
            color={COLOR_CODE_INDIGO_BLUE}
            isPreviewFocusable={false}
            onSubmit={handleSubmitTitle}
          >
            <EditablePreview />
            <EditableInput width="70%" />
            <EditableControls />
          </Editable>
        ) : (
          <Heading size="lg" color={COLOR_CODE_INDIGO_BLUE}>
            {denimReport.title}
          </Heading>
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
        <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
          バック
        </Heading>
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
        <Heading size="md" color={COLOR_CODE_INDIGO_BLUE}>
          詳細画像
        </Heading>
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
        {isEditable ? (
          <Editable
            marginTop="10px"
            defaultValue={denimReport.description ?? ''}
            fontSize="inherit"
            fontFamily="body"
            color={COLOR_CODE_GRAY}
            isPreviewFocusable={false}
            onSubmit={handleSubmitDescription}
          >
            <EditablePreview />
            <EditableInput as="textarea" />
            <Box display="flex" justifyContent="center">
              <EditableControls />
            </Box>
          </Editable>
        ) : (
          <Box color={COLOR_CODE_GRAY}>{denimReport.description}</Box>
        )}
      </Box>
    </Box>
  );
};

export default DenimReport;
