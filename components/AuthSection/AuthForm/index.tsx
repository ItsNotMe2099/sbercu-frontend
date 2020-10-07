import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from 'components/ui/InputPassword'
import styles from './index.module.scss'
import Link from 'next/link'
import Input from 'components/ui/Input'
import {required} from 'utils/validations'

let AuthForm = props => {
  const { handleSubmit } = props
  return (
          <form onSubmit={handleSubmit}>
            <Field
              name="login"
              component={Input}
              label="Логин"
              validate={required}
            />
            <Field
              name="password"
              label="Пароль"
              component={InputPassword}
              validate={required}
            />
            <div className={styles.container}>
              <Button small>Войти</Button>
              <Link href="/password-recovery-email">
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