import type { NextSeoProps } from 'next-seo';

export const seoConfig: NextSeoProps = {
  titleTemplate: '%s | denitz',
  defaultTitle: 'denitz',
  title: 'denitz',
  description: 'denitzはジーンズの色落ちを記録・共有できるサービスです。',
  openGraph: {
    type: 'website',
    locale: 'ja_jp',
    url: 'https://www.denitz.net',
    site_name: 'denitz',
    title: 'denitz',
    description: 'denitzはジーンズの色落ちを記録・共有できるサービスです。',
    images: [
      {
        url: 'https://i.gyazo.com/6a7d97449068a9802ec0926e4ee709af.png',
        width: 1200,
        height: 630,
        alt: 'denitz.net',
      },
    ],
  },
  twitter: {
    handle: '@eringi_v3',
    site: '@eringi_v3',
    cardType: 'summary_large_image',
  },
};
