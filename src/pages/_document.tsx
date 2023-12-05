import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='dark'>
      <Head />
      <body className='dark:bg-slate-900 dark:text-slate-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
