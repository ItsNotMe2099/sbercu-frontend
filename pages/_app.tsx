import Head from 'next/head'
import 'normalize.css'
import {Provider} from 'react-redux';
import {store} from 'store'
import 'scss/app.scss'
import 'videojs-vr/dist/videojs-vr.css'
import 'components/video/Editor/EditorTrimmer/Range/index.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "react-awesome-lightbox/build/style.css";
export default function App({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"/>
        <title>Новая Медиатека</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
             (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(79176247, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
        `,
          }}
        />
        <noscript dangerouslySetInnerHTML={{
          __html: `<div><img src="https://mc.yandex.ru/watch/79176247" style="position:absolute; left:-9999px;" alt="" /></div>`
        }}/>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
