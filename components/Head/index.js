import React from 'react';
import Head from 'next/head';

const HeadComponent = ({ titlePage }) => {
  return(
      <Head>
        <title>{titlePage}</title>
      </Head>
  );
}

export default HeadComponent;