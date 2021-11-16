import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import { UserInput } from '../lib/graphql';

type Form = {
  accountId: string;
};
const AccountForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const { client, hasToken } = useGraphqlClient();

  const reactQueryClient = useQueryClient();

  const toast = useToast();

  const { data: currentUserData } = useQuery(
    ['currentUser'],
    () => client.GetCurrentUser(),
    {
      enabled: hasToken,
    }
  );

  const updateUserMutation = useMutation(
    ({ updateUserId, input }: { updateUserId: string; input: UserInput }) =>
      client.UpdateUser({ updateUserId: updateUserId, input }),
    {
      onSuccess: () => {
        toast({
          title: 'アカウント情報を更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        reactQueryClient.invalidateQueries(['currentUser']);
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
    if (currentUserData?.getCurrentUser?.id === undefined) {
      return;
    }

    updateUserMutation.mutate({
      updateUserId: currentUserData.getCurrentUser.id,
      input: {
        accountId: data.accountId,
      },
    });
  };

  useEffect(() => {
    if (currentUserData && currentUserData.getCurrentUser) {
      setValue('accountId', currentUserData.getCurrentUser.accountId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="accountId" isRequired>
        <FormLabel>ID</FormLabel>
        <Input
          {...register('accountId', {
            required: 'この項目は必須です',
            maxLength: {
              value: 40,
              message: '40文字以内で入力してください',
            },
          })}
        />
        <FormHelperText color="red">{errors.accountId?.message}</FormHelperText>
      </FormControl>
      <Box display="flex" justifyContent="center" marginTop="40px">
        <Button type="submit">保存する</Button>
      </Box>
    </form>
  );
};

export default AccountForm;
