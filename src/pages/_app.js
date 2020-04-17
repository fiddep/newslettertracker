import React from "react";
import { Head } from "next/document";

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>My new cool app</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
