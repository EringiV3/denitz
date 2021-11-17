import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ImageCropModal from '../components/ImageCropModal';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { useUploadImage } from '../hooks/useUploadImage';
import { DenimInput } from '../lib/graphql';
import { readFile } from '../utils/image';

type Form = {
  name: string;
  description: string;
  imageUrl: string;
};
const DenimForm: React.FC = () => {
  const { upload, isUploading } = useUploadImage();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const { client, hasToken } = useGraphqlClient();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

  const { data } = useQuery(['currentUser'], () => client.GetCurrentUser(), {
    enabled: hasToken,
  });

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

  const onSubmit: SubmitHandler<Form> = async (data) => {
    let imageUrl: string | undefined;
    if (croppedImageBlob === null) {
      toast({
        title: '画像を設定してください',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    try {
      imageUrl = await upload(croppedImageBlob);
    } catch (error) {
      console.error(error);
      toast({
        title: '画像のアップロードに失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    createDenimMutation.mutate({
      name: data.name,
      description: data.description,
      imageUrl,
    });
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
  const [croppedImagePreviewUrl, setCroppedImagePreviewUrl] = useState<
    string | null
  >(null);
  const {
    isOpen: isOpenImageCropModal,
    onClose: closeImageCropModal,
    onOpen: openImageCropModal,
  } = useDisclosure();

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file === null) {
      return;
    }
    readFile(file).then((url) => {
      setImageUrl(url);
      openImageCropModal();
    });
  };

  useEffect(() => {
    if (croppedImageBlob === null) {
      return;
    }
    readFile(croppedImageBlob).then((url) => setCroppedImagePreviewUrl(url));
  }, [croppedImageBlob]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          {croppedImagePreviewUrl && (
            <Box
              display="flex"
              justifyContent="center"
              position="relative"
              width="100%"
              height="200px"
            >
              {/* <Image
                src={croppedImagePreviewUrl}
                alt="denim"
                objectFit="cover"
              /> */}
              <NextImage
                src={croppedImagePreviewUrl}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          )}
          <Box display="flex" justifyContent="center" marginTop="10px">
            <label>
              <Link color="blue.400">画像を選択する</Link>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleChangeFile}
              />
            </label>
          </Box>
        </Box>
        <FormControl id="name" isRequired marginTop="20px">
          <FormLabel>名前</FormLabel>
          <Input
            {...register('name', {
              required: 'この項目は必須です',
              maxLength: {
                value: 30,
                message: '30文字以内で入力してください',
              },
            })}
          />
          <FormHelperText color="red">{errors.name?.message}</FormHelperText>
        </FormControl>
        <FormControl id="description" marginTop="20px">
          <FormLabel>説明文</FormLabel>
          <Textarea {...register('description')} />
          <FormHelperText color="red">
            {errors.description?.message}
          </FormHelperText>
        </FormControl>
        <Box display="flex" justifyContent="center" marginTop="40px">
          <Button
            type="submit"
            isLoading={createDenimMutation.isLoading || isUploading}
          >
            送信する
          </Button>
        </Box>
      </form>
      {imageUrl && (
        <ImageCropModal
          isOpen={isOpenImageCropModal}
          onClose={closeImageCropModal}
          imageUrl={imageUrl}
          outputImageMaxWidth={800}
          setCroppedImageBlob={setCroppedImageBlob}
          cropShape="rect"
          aspects={[
            { name: '正方形', value: 1 },
            { name: '縦長', value: 9 / 16 },
            { name: '横長', value: 16 / 9 },
          ]}
        />
      )}
    </>
  );
};

export default DenimForm;
