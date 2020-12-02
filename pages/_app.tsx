import Head from 'next/head'
import 'normalize.css'
import { Provider } from 'react-redux';
import {store} from 'store'
import 'scss/app.scss'
import 'video-react/dist/video-react.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Head> 
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>     
    </Head>
    <Component {...pageProps} />
  </Provider>
  )
}