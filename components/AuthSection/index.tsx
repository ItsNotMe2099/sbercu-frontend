import React from 'react'
import AuthForm from './AuthForm'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clickOnSubmit } from 'actions'

interface Props {}

export default function AuthSection(props: Props) {
  const dispatch = useDispatch()
  const submit = values => {
      dispatch(clickOnSubmit({email: values.login, password: values.password}))
  }
    return (
      <div className={styles.container}>
          <div className={styles.head_green}>media.</div>
          <div className={styles.enter}>Войдите, чтобы продолжить</div>
          <div className={styles.head}><span>ВШ ID</span> или <span>Почта</span></div>
          <AuthForm onSubmit={submit}/>
      </div>
    )
  }
