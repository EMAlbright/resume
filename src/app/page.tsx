import ThreeScene from './components/threeD/exampleScene/mainScene';
import Head from 'next/head';
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
