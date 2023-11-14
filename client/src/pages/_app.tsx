import { Provider as ReduxProvider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';
import store from '@/redux/store';
import 'normalize.css'
import '@/assets/styles/globals.scss'

const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL!;

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
