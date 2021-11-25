import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { useUploadImage } from '../hooks/useUploadImage';
import { DenimReportInput } from '../lib/graphql';
import {
  backImageState,
  detailImagesState,
  frontImageState,
  submitDataState,
} from '../states/denimReportCreator';

type Form = {
  title: string;
  description: string;
};
const TitleDescriptionStep: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { upload, isUploading } = useUploadImage();

  const router = useRouter();

  const { client, hasToken } = useGraphqlClient();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

  const frontImage = useRecoilValue(frontImageState);
  const backImage = useRecoilValue(backImageState);
  const detailImage = useRecoilValue(detailImagesState);
  const submitData = useRecoilValue(submitDataState);

  const { data: currentUserData } = useQuery(
    ['currentUser'],
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const createDenimReportMutation = useMutation(
    (input: DenimReportInput) => client.CreateDenimReport({ input }),
    {
      onSuccess: (_, input) => {
        toast({
          title: '色落ち記録を作成しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(['denims', input.denimId]);
        router.push(
          `/${currentUserData?.getCurrentUser?.accountId}/denims/${input.denimId}`
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

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const denimId = submitData.denimId;
    if (denimId === null) {
      return;
    }
    if (frontImage === null || backImage === null) {
      return;
    }
    const [frontImageUrl, backImageUrl] = await Promise.all(
      [frontImage, backImage].map(async (image) => {
        const imageUrl = await upload(image.blob);
        return imageUrl;
      })
    );

    const detailImageUrls = await Promise.all(
      detailImage.map(async (image) => {
        const imageUrl = await upload(image.blob);
        return imageUrl;
      })
    );

    createDenimReportMutation.mutate({
      denimId,
      frontImageUrl,
      backImageUrl,
      detailImageUrls,
      title: data.title,
      description: data.description,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="title" isRequired marginTop="20px">
        <FormLabel>タイトル</FormLabel>
        <Input
          {...register('title', {
            required: 'この項目は必須です',
            maxLength: { value: 30, message: '30文字以内で入力してください' },
          })}
        />
        <FormHelperText color="red">{errors.title?.message}</FormHelperText>
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
          isLoading={createDenimReportMutation.isLoading || isUploading}
        >
          送信する
        </Button>
      </Box>
    </form>
  );
};

export default TitleDescriptionStep;
