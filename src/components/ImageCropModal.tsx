import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { createImage } from '../utils/image';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  outputImageMaxWidth: number;
  setCroppedImageBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
  cropShape?: 'rect' | 'round';
  aspects: {
    name: string;
    value: number;
  }[];
};
const ImageCropModal: React.FC<Props> = ({
  isOpen,
  onClose,
  imageUrl,
  outputImageMaxWidth,
  setCroppedImageBlob,
  cropShape = 'round',
  aspects,
}) => {
  const [aspect, setAspect] = useState(aspects[0].value);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [blob, setBlob] = useState<Blob | null>(null);

  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      const outputWidth =
        croppedAreaPixels.width < outputImageMaxWidth
          ? croppedAreaPixels.width
          : outputImageMaxWidth;
      const outputHeight =
        croppedAreaPixels.width < outputImageMaxWidth
          ? croppedAreaPixels.height
          : outputImageMaxWidth / aspect;
      console.log(croppedArea, croppedAreaPixels);
      const image = await createImage(imageUrl);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to crop the image.');
      }

      canvas.width = outputWidth;
      canvas.height = outputHeight;

      ctx.drawImage(
        image as CanvasImageSource,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob === null) {
            reject('Failed to crop the image.');
          } else {
            resolve(blob);
          }
        }, 'image/png');
      });
      setBlob(blob);
    },
    [aspect, imageUrl, outputImageMaxWidth]
  );

  const handleClickCrop = () => {
    if (blob === null) {
      return;
    }
    setCroppedImageBlob(blob);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>画像リサイズ</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box height="300px" position="relative">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              showGrid={false}
              cropShape={cropShape}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Box marginTop="20px">
            <Box fontWeight="bold">アスペクト比</Box>
            {aspects.length >= 2 && (
              <ButtonGroup variant="outline" spacing="6" marginTop="10px">
                {aspects.map((_aspect) => (
                  <Button
                    key={_aspect.value}
                    onClick={() => setAspect(_aspect.value)}
                    colorScheme={_aspect.value === aspect ? 'blue' : undefined}
                  >
                    {_aspect.name}
                  </Button>
                ))}
              </ButtonGroup>
            )}
          </Box>
          <Box marginTop="20px">
            <Slider
              aria-label="image-crop-slider"
              defaultValue={0}
              min={1}
              max={3}
              step={0.1}
              onChange={(v) => setZoom(v)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Box display="flex" justifyContent="center" width="100%">
            <Button colorScheme="blue" onClick={handleClickCrop}>
              確定する
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageCropModal;
