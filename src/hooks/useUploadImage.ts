import { useMutation } from 'react-query';
import { MEDIA_HOST } from '../config/constants';
import { useGraphqlClient } from './useGraphqlClient';

export const useUploadImage = () => {
  const { client } = useGraphqlClient();
  const createS3SignedUrlMutation = useMutation((contentType: string) =>
    client.CreateS3SignedUrl({ input: { contentType } })
  );

  const upload = async (file: Blob) => {
    try {
      const contentType = 'image/png';
      const data = await createS3SignedUrlMutation.mutateAsync(contentType);
      await fetch(data.createS3SignedUrl.signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: file,
      });
      return `${MEDIA_HOST}/${data.createS3SignedUrl.fileName}`;
    } catch (error) {
      throw error;
    }
  };

  return { upload };
};
