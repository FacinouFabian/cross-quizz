import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'

/**
 * @description entity to augment our application's /html and /body> tags
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body className="font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
