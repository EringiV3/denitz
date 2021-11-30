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
        toast({
          title: '色落ち記録を更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(
          queryKeys.denimReport(denimReport.denim?.id ?? '', denimReport.id)
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
        toast({
          title: '色落ち記録を削除しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(
          queryKeys.denim(denimReport.denim?.id ?? '')
        );
        router.push(`/${denimReport.denim?.user?.accountId}`);
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
            <MenuButton as={Button} rightIcon={<FaAngleDown />}>
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
            isPreviewFocusable={false}
            onSubmit={handleSubmitTitle}
          >
            <EditablePreview />
            <EditableInput width="70%" />
            <EditableControls />
          </Editable>
        ) : (
          <Heading size="lg">{denimReport.title}</Heading>
        )}
        <Box>
          デニム:{' '}
          <NextLink
            href={`/${denimReport.denim?.user?.accountId}/denims/${denimReport.denim?.id}`}
          >
            <Link color="blue.600">{denimReport.denim?.name}</Link>
          </NextLink>
        </Box>
        <Box>作成日: {dayjs(denimReport.createdAt).format('YYYY/MM/DD')}</Box>
        <Box>更新日: {dayjs(denimReport.updatedAt).format('YYYY/MM/DD')}</Box>
      </Box>
      <Box marginTop="40px">
        <Heading size="md">フロント</Heading>
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
        <Heading size="md">バック</Heading>
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
        <Heading size="md">詳細画像</Heading>
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
          <Box>{denimReport.description}</Box>
        )}
      </Box>
    </Box>
  );
};

export default DenimReport;
