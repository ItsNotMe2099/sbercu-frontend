import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from '../../ui/InputPassword'
import styles from './index.module.scss'
import Link from 'next/link'
import Input from 'components/ui/Input'

let AuthForm = props => {
  const { handleSubmit } = props
  return (
          <form onSubmit={handleSubmit}>
            <Field
              name="login"
              component={Input}
              label="Логин"
            />
            <Field
              name="password"
              label="Пароль"
              component={InputPassword}
            />
            <div className={styles.container}>
              <Button small>Войти</Button>
              <Link href="#">
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