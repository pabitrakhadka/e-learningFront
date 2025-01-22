import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap" />
      <link href="https://fonts.googleapis.com/css2?family=Mukt+Mahee&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Mukt&display=swap" rel="stylesheet" />

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
