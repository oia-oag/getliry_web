
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import logo from '../public/getliry-logo.png';

export default function Home() {
  const [name, setName] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [voice, setVoice] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center text-center p-4">
      <Head>
        <title>GetLiry</title>
      </Head>
      <Image src={logo} alt="GetLiry Logo" width={128} height={128} />
      <h1 className="text-4xl font-bold mt-4">Bienvenid@ a GetLiry</h1>
      <p className="mt-2 text-lg text-gray-600">Antes de comenzar, cuéntanos cómo deseas ser llamad@...</p>
      <div className="mt-6 space-y-4 w-full max-w-md text-left">
        <label className="block">
          Nombre simbólico:
          <input type="text" className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label className="block">
          Pronombre preferido:
          <input type="text" className="w-full p-2 border rounded" value={pronoun} onChange={e => setPronoun(e.target.value)} />
        </label>
        <label className="block">
          Voz que te inspira (poética, alegre, neutra...):
          <input type="text" className="w-full p-2 border rounded" value={voice} onChange={e => setVoice(e.target.value)} />
        </label>
      </div>
    </div>
  );
}
