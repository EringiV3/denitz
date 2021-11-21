import {
  Box,
  Button,
  ButtonGroup,
  Link,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ImageCropModal from '../components/ImageCropModal';
import { useDenimReportCreator } from '../hooks/useDenimReportCreator';
import { croppedBackImageState } from '../states/denimReportCreator';
import { readFile } from '../utils/image';

const SelectBackImageStep: React.FC = () => {
  const { goToNextStep, backToPreviousStep } = useDenimReportCreator();
  const [croppedBackImage, setCroppedBackImage] = useRecoilState(
    croppedBackImageState
  );
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
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
    readFile(croppedImageBlob).then((url) => {
      setCroppedBackImage({
        blob: croppedImageBlob,
        previewUrl: url,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImageBlob]);

  const handleClickNext = () => {
    if (croppedBackImage.blob === null) {
      toast({
        title: '画像を選択してください',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    goToNextStep();
  };

  const handleClickBack = () => {
    backToPreviousStep();
  };

  return (
    <>
      <Box>
        {croppedBackImage.previewUrl !== null && (
          <Box
            display="flex"
            justifyContent="center"
            position="relative"
            width="100%"
            height="200px"
          >
            <NextImage
              src={croppedBackImage.previewUrl}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        )}
        <Box display="flex" justifyContent="center" marginTop="10px">
          <label>
            <Link color="blue.400">画像を選択する</Link>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleChangeFile}
            />
          </label>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="40px">
        <ButtonGroup>
          <Button onClick={handleClickBack}>戻る</Button>
          <Button onClick={handleClickNext}>次へ</Button>
        </ButtonGroup>
      </Box>
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

export default SelectBackImageStep;
