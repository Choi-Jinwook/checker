import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body className="window">
        <Main />
        <NextScript />
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      </body>
    </Html>
  )
}
