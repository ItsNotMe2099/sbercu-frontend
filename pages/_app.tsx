import Head from 'next/head'
import 'normalize.css'
import {Provider} from 'react-redux';
import {store} from 'store'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css';
import 'scss/app.scss'
import 'videojs-vr/dist/videojs-vr.css'
import 'components/video/Editor/EditorTrimmer/Range/index.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-toastify/dist/ReactToastify.css'
import "react-awesome-lightbox/build/style.css"
import 'react-phone-number-input/style.css'
import dynamic from 'next/dynamic'
const TourProvider = dynamic(() => import('components/onboarding/TourProvider'))

//import 'react-calendar/dist/Calendar.css';

export default function App({Component, pageProps}) {

  return (
    <Provider store={store}>

      <Head>
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
      <TourProvider user={pageProps.user}>
        <Component {...pageProps} />
      </TourProvider>
    </Provider>
  )
}
