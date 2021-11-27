import { atom } from 'recoil';

export const currentStepState = atom({
  key: 'DENIM_REPORT_CREATOR/CURRENT_STEP',
  default: 1,
});

export const denimIdState = atom<string | null>({
  key: 'DENIM_REPORT_CREATOR/DENIM_ID',
  default: null,
});

export const frontImageState = atom<{
  blob: Blob;
  previewUrl: string;
} | null>({
  key: 'DENIM_REPORT_CREATOR/FRONT_IMAGE',
  default: null,
});

export const backImageState = atom<{
  blob: Blob;
  previewUrl: string;
} | null>({
  key: 'DENIM_REPORT_CREATOR/BACK_IMAGE',
  default: null,
});

export const detailImagesState = atom<
  {
    blob: Blob;
    previewUrl: string;
  }[]
>({
  key: 'DENIM_REPORT_CREATOR/DETAIL_IMAGES',
  default: [],
});
