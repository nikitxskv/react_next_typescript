import Document, { Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core';

/**
 * Override базового компонента для серверного рендеринга стилей.
 * https://nextjs.org/docs/advanced-features/custom-document
 */
export default class PulsarDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
