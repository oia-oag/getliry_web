
import Head from 'next/head';
import Image from 'next/image';
import ChatOnboarding from '../components/ChatOnboarding';

export default function Home() {
  return (
    <>
      <Head>
        <title>GetLiry</title>
        <meta name="description" content="Onboarding poético con Liry" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center text-center p-4">
        <Image src="/getliry-logo.png" alt="GetLiry Logo" width={128} height={128} />
        <h1 className="text-4xl font-bold mt-4">Bienvenid@ a GetLiry</h1>
        <ChatOnboarding />
      </main>
    </>
  );
}
