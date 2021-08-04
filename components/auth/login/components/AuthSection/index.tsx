import { loginReset, loginSubmit } from "components/auth/login/actions";
import { useRouter } from "next/router";
import React from 'react'
import AuthForm from './AuthForm'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import Button from 'components/ui/Button'

interface Props {}

export default function AuthSection(props: Props) {
  const dispatch = useDispatch()
    const router = useRouter()
    console.log("Query",process.env);
  const redirect = router.query.redirect as string;
  const submit = values => {
    throw new Error("Test");
      dispatch(loginReset());
      dispatch(loginSubmit({email: values.login, password: values.password, redirect}))
  }
    return (
      <div className={styles.container}>
          <div className={styles.head_green}>media.</div>
          <div className={styles.enter}>
            <div>Войдите, чтобы продолжить</div>
            <Button onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_SBER_AUTH_URL}`}  size='10px 25px' green className={styles.virtScoolButton}>Войти через виртуальную школу</Button>

          </div>
        <div className={styles.or}><div className={styles.or__line}/>
          <div className={styles.or__text}>или</div>
          <div className={styles.or__line}/>
        </div>
          <AuthForm onSubmit={submit}/>
      </div>
    )
  }
