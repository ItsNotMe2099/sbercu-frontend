import { loginReset, loginSubmit } from "components/auth/login/actions";
import React from 'react'
import AuthForm from './AuthForm'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'

interface Props {}

export default function AuthSection(props: Props) {
  const dispatch = useDispatch()
  const submit = values => {
      dispatch(loginReset());
      dispatch(loginSubmit({email: values.login, password: values.password}))
  }
    return (
      <div className={styles.container}>
          <div className={styles.head_green}>media.</div>
          <div className={styles.enter}>Войдите, чтобы продолжить</div>
          <div className={styles.head}><a href={process.env.NEXT_SBER_AUTH_URL}>ВШ ID</a> или <span>Почта</span></div>
          <AuthForm onSubmit={submit}/>
      </div>
    )
  }
