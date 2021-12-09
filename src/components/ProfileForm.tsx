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
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ImageCropModal from '../components/ImageCropModal';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { useUploadImage } from '../hooks/useUploadImage';
import { ProfileInput } from '../lib/graphql';
import { readFile } from '../utils/image';
import { queryKeys } from '../utils/queryKeyFactory';
import Avatar from './Avatar';

type Form = {
  name: string;
  description: string;
  twitterUserName: string;
  instagramUserName: string;
  websiteUrl: string;
};
const ProfileForm: React.FC = () => {
  const { upload, isUploading } = useUploadImage();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const { client, hasToken } = useGraphqlClient();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

  const { data } = useQuery(
    queryKeys.currentUser(),
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const { data: profileData } = useQuery(
    queryKeys.profile(data?.getCurrentUser?.accountId ?? ''),
    () =>
      client.GetProfile({ accountId: data?.getCurrentUser?.accountId ?? '' }),
    { enabled: !!data?.getCurrentUser?.accountId }
  );

  const updateProfileMutation = useMutation(
    ({
      updateProfileId,
      input,
    }: {
      updateProfileId: string;
      input: ProfileInput;
    }) => client.UpdateProfile({ updateProfileId: updateProfileId, input }),
    {
      onSuccess: () => {
        if (!data?.getCurrentUser?.accountId) {
          return;
        }
        toast({
          title: 'プロフィールを更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(
          queryKeys.profile(data.getCurrentUser.accountId)
        );
        router.push(`/${data.getCurrentUser.accountId}`);
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
    if (profileData?.getProfile.id === undefined) {
      return;
    }

    let iconImageUrl: string | undefined;
    if (croppedImageBlob !== null) {
      try {
        iconImageUrl = await upload(croppedImageBlob);
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
    }
    updateProfileMutation.mutate({
      updateProfileId: profileData.getProfile.id,
      input: {
        iconImageUrl: iconImageUrl
          ? iconImageUrl
          : profileData.getProfile.iconImageUrl,
        name: data.name,
        description: data.description,
        twitterUserName: data.twitterUserName,
        instagramUserName: data.instagramUserName,
        websiteUrl: data.websiteUrl,
      },
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

  useEffect(() => {
    if (profileData) {
      setValue('name', profileData.getProfile.name ?? '');
      setValue('description', profileData.getProfile.description ?? '');
      setValue(
        'instagramUserName',
        profileData.getProfile.instagramUserName ?? ''
      );
      setValue('twitterUserName', profileData.getProfile.twitterUserName ?? '');
      setValue('websiteUrl', profileData.getProfile.websiteUrl ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box display="flex" justifyContent="center">
            <Avatar
              src={
                croppedImagePreviewUrl
                  ? croppedImagePreviewUrl
                  : profileData?.getProfile.iconImageUrl ?? ''
              }
              size={100}
            />
          </Box>
          <Box display="flex" justifyContent="center" marginTop="10px">
            <label>
              <Link color="blue.400">変更する</Link>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleChangeFile}
              />
            </label>
          </Box>
        </Box>
        <FormControl id="name" isRequired>
          <FormLabel>表示名</FormLabel>
          <Input
            {...register('name', {
              required: 'この項目は必須です',
              maxLength: {
                value: 20,
                message: '20文字以内で入力してください',
              },
            })}
          />
          <FormHelperText color="red">{errors.name?.message}</FormHelperText>
        </FormControl>
        <FormControl id="description" marginTop="20px">
          <FormLabel>自己紹介</FormLabel>
          <Textarea
            {...register('description', {
              maxLength: {
                value: 250,
                message: '250文字以内で入力してください',
              },
            })}
          />
          <FormHelperText color="red">
            {errors.description?.message}
          </FormHelperText>
        </FormControl>
        <FormControl id="twitter-url" marginTop="20px">
          <FormLabel>Twitterユーザー名</FormLabel>
          <Input
            {...register('twitterUserName', {
              maxLength: {
                value: 15,
                message: '15文字以内で入力してください',
              },
            })}
          />
          <FormHelperText color="red">
            {errors.twitterUserName?.message}
          </FormHelperText>
        </FormControl>
        <FormControl id="instagram-url" marginTop="20px">
          <FormLabel>Instagramユーザー名</FormLabel>
          <Input
            {...register('instagramUserName', {
              maxLength: {
                value: 30,
                message: '30文字以内で入力してください',
              },
            })}
          />
          <FormHelperText color="red">
            {errors.instagramUserName?.message}
          </FormHelperText>
        </FormControl>
        <FormControl id="website-url" marginTop="20px">
          <FormLabel>WebサイトURL</FormLabel>
          <Input
            {...register('websiteUrl', {
              maxLength: {
                value: 100,
                message: '100文字以内で入力してください',
              },
            })}
          />
          <FormHelperText color="red">
            {errors.websiteUrl?.message}
          </FormHelperText>
        </FormControl>
        <Box display="flex" justifyContent="center" marginTop="40px">
          <Button
            type="submit"
            isLoading={updateProfileMutation.isLoading || isUploading}
          >
            保存する
          </Button>
        </Box>
      </form>
      {imageUrl && (
        <ImageCropModal
          isOpen={isOpenImageCropModal}
          onClose={closeImageCropModal}
          imageUrl={imageUrl}
          outputImageMaxWidth={150}
          setCroppedImageBlob={setCroppedImageBlob}
          aspects={[{ name: '正方形', value: 1 }]}
        />
      )}
    </>
  );
};

export default ProfileForm;
