import { loginReset, loginSubmit } from "components/auth/login/actions";
import { useRouter } from "next/router";
import React from 'react'
import AuthForm from './AuthForm'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'

interface Props {}

export default function AuthSection(props: Props) {
  const dispatch = useDispatch()
    const router = useRouter()
    console.log("Query",process.env);
  const redirect = router.query.redirect as string;
  const submit = values => {
      dispatch(loginReset());
      dispatch(loginSubmit({email: values.login, password: values.password, redirect}))
  }
    return (
      <div className={styles.container}>
          <div className={styles.head_green}>media.</div>
          <div className={styles.enter}>Войдите, чтобы продолжить</div>
          <div className={styles.head}><a href={`${process.env.NEXT_PUBLIC_SBER_AUTH_URL}${redirect ? `%3Fredirect=${redirect}` : ''}`}>ВШ ID</a> или <span>Почта</span></div>
          <AuthForm onSubmit={submit}/>
      </div>
    )
  }
