import React from 'react'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import AuthControlForm from './AuthControlForm'

interface Props {}

export default function AuthControl(props: Props) {
  const dispatch = useDispatch()
  const submit = values => {

  }
    return (
      <div className={styles.container}>
          <div className={styles.head}>media.</div>
          <div className={styles.reg}>Регистрация пользователя</div>
          <AuthControlForm onSubmit={submit}/>
      </div>
    )
  }
