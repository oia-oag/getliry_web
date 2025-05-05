// pages/_app.tsx
import '../styles/chat.css'; // 👈 Importa aquí el CSS global
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
