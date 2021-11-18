import { useState } from 'react';
import { useMutation } from 'react-query';
import { MEDIA_HOST } from '../config/constants';
import { useGraphqlClient } from './useGraphqlClient';

export const useUploadImage = () => {
  const { client } = useGraphqlClient();
  const createS3SignedUrlMutation = useMutation((contentType: string) =>
    client.CreateS3SignedUrl({ input: { contentType } })
  );
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: Blob) => {
    try {
      setIsUploading(true);
      const contentType = 'image/png';
      const data = await createS3SignedUrlMutation.mutateAsync(contentType);
      await fetch(data.createS3SignedUrl.signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: file,
      });
      setIsUploading(false);
      return `${MEDIA_HOST}/${data.createS3SignedUrl.fileName}`;
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  return { upload, isUploading };
};
