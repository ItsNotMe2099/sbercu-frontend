import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from 'components/ui/InputPassword'
import styles from './index.module.scss'

let NewPWForm = props => {
  const { handleSubmit } = props
  return (
          <form onSubmit={handleSubmit}>
            <div className={styles.fakeMargin}></div>
            <div className={styles.head}>Придумайте новый пароль</div>
            <div className={styles.tip}>Должен содержать не менее 8 символов, заглавные, строчные латинские буквы и небуквенные символы</div>
            <Field
              name="new-password"
              component={InputPassword}
              label="Введите пароль"
            />
            <Field
              name="new-password-again"
              component={InputPassword}
              label="Введите пароль повторно"
            />
              <div className={styles.send}>
              <Button vlarge>Сохранить</Button>
              </div>
          </form>
  )
}


NewPWForm = reduxForm ({
  form: 'EmailFormRecovery',
}) (NewPWForm)

export default NewPWForm