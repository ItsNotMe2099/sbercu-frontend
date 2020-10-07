import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import styles from './index.module.scss'
import Link from 'next/link'
import PasswordRecoveryHeader from '../PWRecoveryHeader'
import {email, required} from 'utils/validations'

let EmailForm = props => {
  const { handleSubmit } = props
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