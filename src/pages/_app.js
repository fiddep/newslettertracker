import Head from "next/head";

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title key="title">Newsletter tracker</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
