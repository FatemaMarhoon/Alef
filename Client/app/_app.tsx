// _app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../services/AuthProvider';
import RootLayout from './layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AuthProvider>
  );
}

export default MyApp;
