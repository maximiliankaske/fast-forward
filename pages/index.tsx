import Head from "next/head";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Head>
        <title>Fast-Forward</title>
        <meta name="description" content="Fast-Forward" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex justify-center items-center">
        <h1 className="text-indigo-500 text-4xl font-semibold">Hello World!</h1>
      </main>
    </div>
  );
}
