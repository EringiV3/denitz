import type { NextSeoProps } from 'next-seo';

export const seoConfig: NextSeoProps = {
  titleTemplate: '%s | denitz',
  defaultTitle: 'denitz',
  openGraph: {
    type: 'website',
    locale: 'ja_jp',
    url: 'https://www.denitz.com',
    site_name: 'denitz',
    images: [
      {
        url: 'https://i.gyazo.com/109d89a435df342b1877a0b5b6fb2d25.png',
        width: 1200,
        height: 630,
        alt: 'denitz.com',
      },
    ],
  },
  twitter: {
    handle: '@eringi_v3',
    site: '@eringi_v3',
    cardType: 'summary_large_image',
  },
};
