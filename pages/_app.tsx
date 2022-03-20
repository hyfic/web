import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloWrapper } from '@/components/core/ApolloWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloWrapper>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloWrapper>
  );
}
