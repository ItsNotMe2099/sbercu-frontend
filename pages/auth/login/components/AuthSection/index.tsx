import { loginReset, loginSubmit } from "pages/auth/login/actions";
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
          <div className={styles.head}><a href={'https://develop-api.sbsdev.ru/v2/oauth/authorize?client_id=27&redirect_uri=https%3A%2F%2Fdev.sbercu.firelabs.ru%2Fapi%2Fauth%2Fsberscoll%2Fcallback&response_type=code'}>ВШ ID</a> или <span>Почта</span></div>
          <AuthForm onSubmit={submit}/>
      </div>
    )
  }
