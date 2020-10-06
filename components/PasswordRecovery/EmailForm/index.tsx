import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import styles from './index.module.scss'
import Link from 'next/link'

let EmailForm = props => {
  const { handleSubmit } = props
  return (
          <form onSubmit={handleSubmit}>
            <div className={styles.back}>
              <Link href="#">
                <a>← Назад</a>
              </Link>
            </div>
          <div className={styles.head}>Введите электронную почту</div>
            <Field
              name="email"
              component={Input}
              label="Почта"
            />
              <div className={styles.send}>
              <Button medium>Отправить</Button>
              </div>
          </form>
  )
}


EmailForm = reduxForm ({
  form: 'EmailFormRecovery',
}) (EmailForm)

export default EmailForm