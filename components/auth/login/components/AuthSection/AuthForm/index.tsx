import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from 'components/ui/Inputs/InputPassword'
import styles from './index.module.scss'
import Link from 'next/link'
import Input from 'components/ui/Inputs/Input'
import {email, required} from 'utils/validations'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'
import FormError from 'components/ui/Form/FormError'
import React from 'react'

let AuthForm = props => {
  const formError = useSelector((state: IRootState) => state.loginSubmit.formError)
  const formLoading = useSelector((state: IRootState) => state.loginSubmit.formLoading)

    const { handleSubmit } = props
  return (
          <form onSubmit={handleSubmit}>
            <div className={styles.title}>Войти через Эл. почту</div>

            <Field
              name="login"
              component={Input}
              placeholder="Логин"
              className={styles.login}
              validate={[required, email]}
            />

            <Field
              name="password"
              label="Пароль"
              component={InputPassword}
              validate={required}
            />

              <FormError error={formError}/>

              <div className={styles.container}>
              <Button disabled={formLoading} size='12px 15px' green>Войти</Button>
              <Link href="/auth/password-forgot">
                <a className={styles.forgot}>Забыли пароль?</a>
              </Link>
            </div>
          </form>
  )
}


AuthForm = reduxForm ({
  form: 'authForm',
}) (AuthForm)

export default AuthForm
