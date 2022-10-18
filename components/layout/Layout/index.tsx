import { ReactElement } from "react";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {ToastContainer} from 'react-toastify'
import CookieFooter from "components/layout/CookieFooter";

interface Props{
    children?: any
}

export default function Layout(props: Props){

  const dispatch = useDispatch()
   return (
    <div className={styles.root}>
        {props.children}
      <ToastContainer
        closeButton={false}
        hideProgressBar={true}
        autoClose={3000}
        icon={<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.50453 10.6L1.95059 6.4L0.432617 7.8L6.50453 13.4L19.5158 1.4L17.9978 0L6.50453 10.6Z" fill="#27AE60"/>
        </svg>
        }
      />
        <CookieFooter/>
    </div>
  )
}
