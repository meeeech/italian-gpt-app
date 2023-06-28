import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Italian with ChatGPT</title>
        <link rel="icon" href="/image/favicon.ico" />
      </Head>
      <header>
        <h1>Learn Italian with GPT</h1>
      </header>
      <main>{children}</main>
    </>
  );
}
