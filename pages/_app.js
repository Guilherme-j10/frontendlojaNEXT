import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/nprogress.css';
import NProgress from 'nprogress';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false
    });

    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return <Component {...pageProps} />
}

export default MyApp;
