import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import {
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_REDIRECT_URI,
} from '../config/constants';
import { useGraphqlClient } from '../hooks/useGraphqlClient';

const queryClient = new QueryClient();

const AppInit = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { updateGraphqlClient } = useGraphqlClient();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        updateGraphqlClient(token);
      });
    } else {
      updateGraphqlClient(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={AUTH0_REDIRECT_URI}
      audience={AUTH0_AUDIENCE}
    >
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ChakraProvider>
            <AppInit />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ChakraProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default MyApp;
