import type { NextSeoProps } from 'next-seo';

export const seoConfig: NextSeoProps = {
  titleTemplate: '%s | denitz',
  defaultTitle: 'denitz',
  openGraph: {
    type: 'website',
    locale: 'js_jp',
    url: 'https://www.denitz.com',
    site_name: 'denitz',
    images: [
      {
        url: 'https://placehold.jp/32/3d4070/ffffff/500x500.png?text=denitz.com',
        width: 1200,
        height: 630,
        alt: 'denitz.com',
      },
    ],
  },
};
