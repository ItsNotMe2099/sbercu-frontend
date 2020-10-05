import Head from 'next/head'
import 'normalize.css'
import { Provider } from 'react-redux';
import {store} from '../store'
import '../scss/app.scss'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Head>
    </Head>
    <Component {...pageProps} />
  </Provider>
  )
}