import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from 'components/ui/InputPassword'
import styles from './index.module.scss'
import Link from 'next/link'
import Input from 'components/ui/Input'
import {email, required} from 'utils/validations'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'

let AuthForm = props => {
  const formError = useSelector((state: IRootState) => state.loginSubmit.formError)
  const { handleSubmit } = props
  return (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
            <Field
              name="login"
              component={Input}
              label="Логин"
              validate={[required, email]}
            />
            </div>
            <div className={styles.inputContainer}>
            <Field
              name="password"
              label="Пароль"
              component={InputPassword}
              validate={required}
            />
            </div>
              {formError ? <div className={styles.error}>{formError}</div> : null}

              <div className={styles.container}>
              <Button size='12px 15px' green>Войти</Button>
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
