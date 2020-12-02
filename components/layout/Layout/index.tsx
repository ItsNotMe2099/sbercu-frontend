import { ReactElement } from "react";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

interface Props{
    children?: any
}

export default function Layout(props: Props){

  const dispatch = useDispatch()
   return (
    <div className={styles.root}>
        {props.children}
    </div>
  )
}
