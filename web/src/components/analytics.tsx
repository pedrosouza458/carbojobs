import React from 'react';
import Script from 'next/script';

const Analitycs = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=G-VX833TQXN4`}
      />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VX833TQXN4', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default Analitycs;