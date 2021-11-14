import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ImageCropModal from '../../components/ImageCropModal';
import Layout from '../../components/Layout';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { useUploadImage } from '../../hooks/useUploadImage';
import { ProfileInput } from '../../lib/graphql';
import { readFile } from '../../utils/image';

type Form = {
  name: string;
  description: string;
  twitterUrl: string;
  instagramUrl: string;
  websiteUrl: string;
};

const ProfileSetting: React.FC = () => {
  const { upload } = useUploadImage();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<Form>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const { client, hasToken } = useGraphqlClient();
  const reactQueryClient = useQueryClient();
  const toast = useToast();
  const { data } = useQuery(['currentUser'], () => client.GetCurrentUser(), {
    enabled: hasToken,
  });
  const { data: profileData } = useQuery(
    ['profile', data?.getCurrentUser?.accountId],
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
        toast({
          title: 'プロフィールを更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries([
          'profile',
          data?.getCurrentUser?.accountId,
        ]);
      },
    }
  );

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (profileData?.getProfile.id === undefined) {
      return;
    }

    console.log({ data });

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
        twitterUrl: data.twitterUrl,
        instagramUrl: data.instagramUrl,
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
      setValue('instagramUrl', profileData.getProfile.instagramUrl ?? '');
      setValue('twitterUrl', profileData.getProfile.twitterUrl ?? '');
      setValue('websiteUrl', profileData.getProfile.websiteUrl ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  return (
    <>
      <Layout>
        <Heading size="md" margin="40px 0 20px 0">
          プロフィール設定
        </Heading>
        <Box marginBottom="40px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box display="flex" justifyContent="center">
                <Avatar
                  src={
                    croppedImagePreviewUrl
                      ? croppedImagePreviewUrl
                      : profileData?.getProfile.iconImageUrl ?? ''
                  }
                  size="2xl"
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
              <FormHelperText color="red">
                {errors.name?.message}
              </FormHelperText>
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
                {...register('twitterUrl', {
                  maxLength: {
                    value: 15,
                    message: '15文字以内で入力してください',
                  },
                })}
              />
              <FormHelperText color="red">
                {errors.twitterUrl?.message}
              </FormHelperText>
            </FormControl>
            <FormControl id="instagram-url" marginTop="20px">
              <FormLabel>Instagramユーザー名</FormLabel>
              <Input
                {...register('instagramUrl', {
                  maxLength: {
                    value: 30,
                    message: '30文字以内で入力してください',
                  },
                })}
              />
              <FormHelperText color="red">
                {errors.instagramUrl?.message}
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
              <Button type="submit" disabled={!isValid}>
                保存する
              </Button>
            </Box>
          </form>
        </Box>
      </Layout>
      {imageUrl && (
        <ImageCropModal
          isOpen={isOpenImageCropModal}
          onClose={closeImageCropModal}
          imageUrl={imageUrl}
          outputImageMaxWidth={500}
          setCroppedImageBlob={setCroppedImageBlob}
        />
      )}
    </>
  );
};

export default ProfileSetting;
