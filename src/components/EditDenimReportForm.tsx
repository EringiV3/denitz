import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Button from '../components/Button';
import { COLOR_CODE_INDIGO_BLUE, COLOR_CODE_WHITE } from '../config/css';
import { useGraphqlClient } from '../hooks/useGraphqlClient';
import type { DenimReport, DenimReportInput } from '../lib/graphql';
import { queryKeys } from '../utils/queryKeyFactory';

type Props = {
  initialValues: DenimReport;
  denimId: string;
  reportId: string;
  accountId: string;
};

type Form = {
  title: string;
  description: string;
};

const EditDenimReportForm: React.FC<Props> = ({
  initialValues,
  denimId,
  reportId,
  accountId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      title: initialValues.title ?? '',
      description: initialValues.description ?? '',
    },
  });

  const router = useRouter();

  const toast = useToast();

  const reactQueryClient = useQueryClient();

  const { client } = useGraphqlClient();

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
          queryKeys.denimReport(denimId, reportId)
        );
        router.push(`/${accountId}/denims/${denimId}/reports/${reportId}`);
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
    updateDenimRepotMutation.mutate({
      id: initialValues.id,
      input: {
        backImageUrl: initialValues.backImageUrl,
        denimId: denimId,
        description: data.description,
        detailImageUrls:
          initialValues.detailImageUrls?.map((image) => image.url) ?? [],
        frontImageUrl: initialValues.frontImageUrl,
        title: data.title,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="title" isRequired marginTop="20px">
          <FormLabel fontWeight="bold" color={COLOR_CODE_INDIGO_BLUE}>
            タイトル
          </FormLabel>
          <Input
            backgroundColor={COLOR_CODE_WHITE}
            borderColor={COLOR_CODE_WHITE}
            color={COLOR_CODE_INDIGO_BLUE}
            {...register('title', {
              required: 'この項目は必須です',
              maxLength: {
                value: 30,
                message: '30文字以内で入力してください',
              },
            })}
          />
          <FormHelperText color="red">{errors.title?.message}</FormHelperText>
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
          <Button type="submit">送信する</Button>
        </Box>
      </form>
    </>
  );
};

export default EditDenimReportForm;
