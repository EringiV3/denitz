import { atom } from 'recoil';

export const currentStepState = atom({
  key: 'DENIM_REPORT_CREATOR/CURRENT_STEP',
  default: 1,
});

export const submitDataState = atom({
  key: 'DENIM_REPORT_CREATOR/SUBMIT_DATA',
  default: {
    denimId: '',
    title: '',
    description: '',
    frontImageUrl: '',
    backImageUrl: '',
    detailImageUrls: [],
  },
});
