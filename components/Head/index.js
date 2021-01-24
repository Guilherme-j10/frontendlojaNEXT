import React from 'react';
import Head from 'next/head';

const HeadComponent = ({ titlePage }) => {
  return(
      <Head>
        <title>{titlePage}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
  );
}

export default HeadComponent;