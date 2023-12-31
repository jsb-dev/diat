import { Provider as ReduxProvider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import type { AppProps } from 'next/app';
import { StyledEngineProvider } from '@mui/material/styles';
import store from '@/redux/store';
import 'normalize.css';
import '@/styles/globals.scss';

const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL!;
const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <StyledEngineProvider injectFirst>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: CALLBACK_URL
        }}
      >
        <ReduxProvider store={store}>
          <Component {...pageProps} />
        </ReduxProvider>
      </Auth0Provider>
    </StyledEngineProvider>
  );
}

export default MyApp;
