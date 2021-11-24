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
