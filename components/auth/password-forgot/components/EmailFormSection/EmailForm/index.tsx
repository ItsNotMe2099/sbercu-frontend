import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import Input from 'components/ui/Inputs/Input'
import styles from './index.module.scss'
import Link from 'next/link'
import {email, required} from 'utils/validations'
import PasswordRecoveryHeader from 'components/PasswordRecovery/PWRecoveryHeader'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'
import FormError from 'components/ui/Form/FormError'

let EmailForm = props => {
  const { handleSubmit } = props
    const formError = useSelector((state: IRootState) => state.PWRecoverEmail.formError)
    const formLoading = useSelector((state: IRootState) => state.PWRecoverEmail.formLoading)
  return (
          <div className={styles.container}>
            <PasswordRecoveryHeader/>
          <form onSubmit={handleSubmit}>
            <div className={styles.back}>
              <Link href="/auth/login">
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
            <FormError error={formError}/>
              <div className={styles.send}>
              <Button disabled={formLoading} size='12px 15px' green>Отправить</Button>
              </div>
          </form>
          </div>
  )
}


EmailForm = reduxForm ({
  form: 'EmailFormRecovery',
}) (EmailForm)

export default EmailForm
