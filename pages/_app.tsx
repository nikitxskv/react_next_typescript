import React from 'react';
import App from 'next/app';

const MainView = ({ Component, pageProps }) => {
  console.log('render');

  return <Component {...pageProps} />;
};

/**
 * Override базового компонента для инициализации страниц.
 * https://nextjs.org/docs/advanced-features/custom-app
 */
class PulsarApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <MainView Component={Component} pageProps={pageProps} />;
  }
}

export default PulsarApp;
