"use client";
import dynamic from 'next/dynamic';
import Head from 'next/head';

const ThreeScene = dynamic(() => import('./components/threeD/exampleScene/mainScene'), { ssr: false });

export default function Home() {
  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Michroma&display=swap" rel="stylesheet"></link>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <ThreeScene />
      </div>
    </>
  );
}
