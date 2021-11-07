import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';
import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_REDIRECT_URI,
} from '../config/constants';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={AUTH0_REDIRECT_URI}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
