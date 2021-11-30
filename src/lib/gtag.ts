import { GOOGLE_ANALYTICS_ID } from '../config/constants';

export const existsGaId = GOOGLE_ANALYTICS_ID !== '';

export const pageview = (path: string) => {
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: path,
  });
};
