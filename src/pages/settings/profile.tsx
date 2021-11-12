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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>();
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
        });
        reactQueryClient.invalidateQueries([
          'profile',
          data?.getCurrentUser?.accountId,
        ]);
      },
    }
  );

  const onSubmit: SubmitHandler<Form> = (data) => {
    if (profileData?.getProfile.id === undefined) {
      return;
    }
    if (croppedImageBlob !== null) {
      // TODO 画像　S3へのアップロード処理
      console.log({ croppedImageBlob });
    }
    updateProfileMutation.mutate({
      updateProfileId: profileData.getProfile.id,
      input: {
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
                defaultValue={profileData?.getProfile.name ?? ''}
                {...register('name')}
              />
              <FormHelperText>error message</FormHelperText>
            </FormControl>
            <FormControl id="description" marginTop="20px">
              <FormLabel>自己紹介</FormLabel>
              <Textarea
                defaultValue={profileData?.getProfile.description ?? ''}
                {...register('description')}
              />
              <FormHelperText>error message</FormHelperText>
            </FormControl>
            <FormControl id="twitter-url" marginTop="20px">
              <FormLabel>Twitterユーザー名</FormLabel>
              <Input
                defaultValue={profileData?.getProfile.twitterUrl ?? ''}
                {...register('twitterUrl')}
              />
              <FormHelperText>error message</FormHelperText>
            </FormControl>
            <FormControl id="instagram-url" marginTop="20px">
              <FormLabel>Instagramユーザー名</FormLabel>
              <Input
                defaultValue={profileData?.getProfile.instagramUrl ?? ''}
                {...register('instagramUrl')}
              />
              <FormHelperText>error message</FormHelperText>
            </FormControl>
            <FormControl id="website-url" marginTop="20px">
              <FormLabel>WebサイトURL</FormLabel>
              <Input
                defaultValue={profileData?.getProfile.websiteUrl ?? ''}
                {...register('websiteUrl')}
              />
              <FormHelperText>error message</FormHelperText>
            </FormControl>
            <Box display="flex" justifyContent="center" marginTop="40px">
              <Button type="submit">保存する</Button>
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
