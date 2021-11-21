import { atom } from 'recoil';

export const currentStepState = atom({
  key: 'DENIM_REPORT_CREATOR/CURRENT_STEP',
  default: 1,
});

export const submitDataState = atom<{
  denimId: string | null;
  title: string | null;
  description: string | null;
  frontImageUrl: string | null;
  backImageUrl: string | null;
  detailImageUrls: string[];
}>({
  key: 'DENIM_REPORT_CREATOR/SUBMIT_DATA',
  default: {
    denimId: null,
    title: null,
    description: null,
    frontImageUrl: null,
    backImageUrl: null,
    detailImageUrls: [],
  },
});

export const croppedFrontImageState = atom<{
  blob: Blob | null;
  previewUrl: string | null;
}>({
  key: 'DENIM_REPORT_CREATOR/CROPPED_FRONT_IMAGE_BLOB',
  default: {
    blob: null,
    previewUrl: null,
  },
});

export const croppedBackImageState = atom<{
  blob: Blob | null;
  previewUrl: string | null;
}>({
  key: 'DENIM_REPORT_CREATOR/CROPPED_BACK_IMAGE_BLOB',
  default: {
    blob: null,
    previewUrl: null,
  },
});

export const croppedDetailImagState = atom<
  {
    blob: Blob | null;
    previewUrl: string | null;
  }[]
>({
  key: 'DENIM_REPORT_CREATOR/CROPPED_DETAIL_IMAGE_BLOB',
  default: [],
});
