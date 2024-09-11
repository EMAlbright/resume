import * as THREE from 'three';
import ThreeScene from './components/threeD/exampleScene/mainScene';
import Head from 'next/head';
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <ThreeScene />
      </div>
    </>
  );
}
