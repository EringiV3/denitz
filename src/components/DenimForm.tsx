import {
  Box,
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
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import ImageCropModal from '../components/ImageCropModal';
import {
  COLOR_CODE_INDIGO_BLUE,
  COLOR_CODE_PINK,
  COLOR_CODE_WHITE,
} from '../config/css';
import { useUploadImage } from '../hooks/useUploadImage';
import { readFile } from '../utils/image';

type Form = {
  name: string;
  description: string;
};

type Props = {
  initialValues?: { name: string; description: string; imageUrl: string };
  executeMutation: (data: Form & { imageUrl: string }) => void;
  isLoadingMutationResult: boolean;
};

const DenimForm: React.FC<Props> = ({
  initialValues,
  executeMutation,
  isLoadingMutationResult,
}) => {
  const { upload, isUploading } = useUploadImage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
    },
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    let imageUrl: string | null;

    // 新規作成時
    if (initialValues?.imageUrl === undefined && croppedImageBlob === null) {
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
      imageUrl = croppedImageBlob
        ? await upload(croppedImageBlob)
        : initialValues
        ? initialValues.imageUrl
        : null;
      if (imageUrl === null) {
        throw new Error('Invalid imageUrl.');
      }
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
    executeMutation({ ...data, imageUrl });
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
          {(croppedImagePreviewUrl !== null || initialValues !== undefined) && (
            <Box
              display="flex"
              justifyContent="center"
              position="relative"
              width="100%"
              height="200px"
            >
              <NextImage
                src={
                  croppedImagePreviewUrl
                    ? croppedImagePreviewUrl
                    : initialValues
                    ? initialValues.imageUrl
                    : ''
                }
                layout="fill"
                objectFit="contain"
              />
            </Box>
          )}
          <Box display="flex" justifyContent="center" marginTop="10px">
            <label>
              <Link
                fontWeight="bold"
                textDecoration="underline"
                color={COLOR_CODE_PINK}
              >
                画像を選択する
              </Link>
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
          <FormLabel fontWeight="bold" color={COLOR_CODE_INDIGO_BLUE}>
            名前
          </FormLabel>
          <Input
            backgroundColor={COLOR_CODE_WHITE}
            borderColor={COLOR_CODE_WHITE}
            color={COLOR_CODE_INDIGO_BLUE}
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
          <FormLabel fontWeight="bold" color={COLOR_CODE_INDIGO_BLUE}>
            説明文
          </FormLabel>
          <Textarea
            backgroundColor={COLOR_CODE_WHITE}
            borderColor={COLOR_CODE_WHITE}
            color={COLOR_CODE_INDIGO_BLUE}
            {...register('description')}
          />
          <FormHelperText color="red">
            {errors.description?.message}
          </FormHelperText>
        </FormControl>
        <Box display="flex" justifyContent="center" marginTop="40px">
          <Button
            type="submit"
            isLoading={isLoadingMutationResult || isUploading}
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
