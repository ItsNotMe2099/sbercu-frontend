import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import styles from './index.module.scss'
import Link from 'next/link'
import {email, required} from 'utils/validations'
import PasswordRecoveryHeader from 'components/PasswordRecovery/PWRecoveryHeader'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'

let EmailForm = props => {
  const { handleSubmit } = props
  const formIsError = useSelector((state: IRootState) => state.PWRecoverEmail.formIsError)
  return (
          <div className={styles.container}>
            <PasswordRecoveryHeader/>
          <form onSubmit={handleSubmit}>
            <div className={styles.back}>
              <Link href="/auth-page">
                <a>← Назад</a>
              </Link>
            </div>
          <div className={styles.head}>Введите электронную почту</div>
            <Field
              name="email"
              component={Input}
              label="Почта"
              validate={[email, required]}
            />
            {formIsError ? <div className={styles.error}>Такая электронная почта не зарегистрирована</div> : null}
              <div className={styles.send}>
              <Button medium>Отправить</Button>
              </div>
          </form>
          </div>
  )
}


EmailForm = reduxForm ({
  form: 'EmailFormRecovery',
}) (EmailForm)

export default EmailForm