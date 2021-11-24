import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Link,
  useToast,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { useDenimReportCreator } from '../hooks/useDenimReportCreator';
import { detailImageState } from '../states/denimReportCreator';
import { removeItemAtIndex } from '../utils/arrayHelpers';
import { readFile } from '../utils/image';

const SelectDetailImagesStep: React.FC = () => {
  const toast = useToast();
  const { goToNextStep, backToPreviousStep } = useDenimReportCreator();
  const [detailImages, setDetailImages] = useRecoilState(detailImageState);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const files = Array.from(e.target.files);
    const detailImages = await Promise.all(
      files.map(async (file) => {
        const url = await readFile(file);
        return {
          previewUrl: url,
          blob: file,
        };
      })
    );
    setDetailImages(detailImages);
  };

  const handleClickNext = () => {
    if (detailImages.length === 0) {
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

  const handleClickRemove = (index: number) => {
    const newDetailImages = removeItemAtIndex(detailImages, index);
    setDetailImages(newDetailImages);
  };

  const handleClickSkip = () => {
    goToNextStep();
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        position="relative"
        top="-30px"
      >
        <Button onClick={handleClickSkip}>スキップ</Button>
      </Box>
      <Box display="flex" overflowX="scroll">
        {detailImages.map((detailImage, i) => (
          <Box
            key={detailImage.previewUrl}
            marginRight="10px"
            position="relative"
            display="flex"
          >
            <NextImage
              src={detailImage.previewUrl}
              width={150}
              height={150}
              layout="fixed"
              objectFit="cover"
            />
            <IconButton
              aria-label="cancel"
              icon={<FaTimes size="15px" />}
              position="absolute"
              top="5px"
              right="5px"
              size="xs"
              onClick={() => handleClickRemove(i)}
            />
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="10px">
        <label>
          <Link color="blue.400">画像を選択する</Link>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleChangeFile}
          />
        </label>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="40px">
        <ButtonGroup>
          <Button onClick={handleClickBack}>戻る</Button>
          <Button onClick={handleClickNext}>次へ</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default SelectDetailImagesStep;
