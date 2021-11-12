import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Layout from '../../components/Layout';
import { useGraphqlClient } from '../../hooks/useGraphqlClient';
import { ProfileInput } from '../../lib/graphql';

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

  return (
    <Layout>
      <Heading size="md" margin="40px 0 20px 0">
        プロフィール設定
      </Heading>
      <Box marginBottom="40px">
        <form onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default ProfileSetting;
