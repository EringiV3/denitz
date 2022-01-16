// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { theme } from '../config/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>👖</text></svg>"
          />
          <link
            rel="icon alternate"
            type="image/png"
            href="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f456.png"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
