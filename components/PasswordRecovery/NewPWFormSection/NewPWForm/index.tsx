import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from 'components/ui/InputPassword'
import styles from './index.module.scss'
import {required, passwordsMatch, minL} from 'utils/validations'
import PasswordRecoveryHeader from 'components/PasswordRecovery/PWRecoveryHeader'

let NewPWForm = props => {
  const { handleSubmit } = props
  return (
          <div className={styles.container}>
            <PasswordRecoveryHeader/>
          <form onSubmit={handleSubmit}>
            <div className={styles.fakeMargin}></div>
            <div className={styles.head}>Придумайте новый пароль</div>
            <div className={styles.tip}>Должен содержать не менее 8 символов, заглавные, строчные латинские буквы и небуквенные символы</div>
            <div className={styles.inputContainer}>
            <Field
              name="new_password"
              component={InputPassword}
              label="Введите пароль"
              validate={[required, minL]}
            />
            </div>
            <div className={styles.inputContainer}>
            <Field
              name="new_password_again"
              component={InputPassword}
              label="Введите пароль повторно"
              validate={[required, minL]}
            />
            </div>
              <div className={styles.send}>
              <Button vlarge>Сохранить</Button>
              </div>
          </form>
          </div>
  )
}


NewPWForm = reduxForm ({
  form: 'EmailFormRecovery',
}) (NewPWForm)

export default NewPWForm