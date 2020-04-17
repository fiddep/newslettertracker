import React from "react";

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
