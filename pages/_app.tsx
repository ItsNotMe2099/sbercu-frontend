import Head from 'next/head'
import 'normalize.css'
import {Provider} from 'react-redux';
import {store} from 'store'
import 'scss/app.scss'
import 'videojs-vr/dist/videojs-vr.css'
import 'components/video/Editor/EditorTrimmer/Range/index.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default function App({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"/>
        <title>Медиатека</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#2b5797"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
