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
  const formIsError = useSelector((state: IRootState) => state.loginSubmit.formIsError)
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
            {formIsError ? <div className={styles.error}>Такая электронная почта не зарегистрирована</div> : null}
            </div>
            <div className={styles.inputContainer}>
            <Field
              name="password"
              label="Пароль"
              component={InputPassword}
              validate={required}
            />
            {formIsError ? <div className={styles.error}>Неверный пароль</div> : null}
            </div>
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