import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from 'components/ui/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import {required, passwordsMatch, minL} from 'utils/validations'
import PasswordRecoveryHeader from 'components/PasswordRecovery/PWRecoveryHeader'
import { useSelector } from 'react-redux'
let NewPWForm = props => {

  const { handleSubmit } = props
  const formError = useSelector((state: IRootState) => state.NewPasswordForm.formError)

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
              name="new_password_confirm"
              component={InputPassword}
              label="Введите пароль повторно"
              validate={[required, passwordsMatch, minL]}
            />
            </div>
            {formError ? <div className={styles.error}>{formError}</div> : null}
              <div className={styles.send}>
              <Button vlarge green>Сохранить</Button>
              </div>
          </form>
          </div>
  )
}


NewPWForm = reduxForm ({
  form: 'NewPasswordForm',
}) (NewPWForm)

export default NewPWForm
