import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Input'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import InputPassword from 'components/ui/InputPassword'
import Link from 'next/link'
import {regFirstStep ,regFirstStepBack} from 'pages/auth-control/actions'
import Button from 'components/ui/Button'
import { minL, passwordsMatch, required } from 'utils/validations'
import styles from './index.module.scss'

let AuthControlForm = props => {
  const { handleSubmit } = props
  const dispatch = useDispatch()
  const firstStepIsComplete = useSelector((state: IRootState) => state.regReducer.firstStepIsComplete)
  return (
          <form onSubmit={handleSubmit}>
            {firstStepIsComplete ?
            <div>
            <a href="#" onClick={dispatch(regFirstStepBack())}>← Назад к данным о себе</a>
            <div>Придумайте пароль</div>
            <div>Должен содержать не менее 8 символов, заглавные, строчные латинские буквы и небуквенные символы</div>
            <Field
            name="password"
            component={InputPassword}
            label="Введите пароль"
            validate={[required, passwordsMatch, minL]}
            />
            <Field
            name="password-confirm"
            label="Введите пароль повторно"
            component={InputPassword}
            validate={[required, passwordsMatch, minL]}
            />
            </div>
            :
            <div>
            <div>Проверьте данные о себе</div>
            <Field
              name="email"
              component={Input}
              label="Почта"
              validate={required}
            />
            <Field
              name="first-name"
              label="Имя"
              component={Input}
              validate={required}
            />
            <Field
              name="last-name"
              label="Фамилия"
              component={Input}
              validate={required}
            />
            <span><a href="#" onClick={dispatch(regFirstStep())}>Далее →</a> <a href="/">или Войти</a></span>
            </div>}
            <div {firstStepIsComplete ? className={styles.buttonStyle} : null}>
            <Button vlarge>Зарегистрироваться</Button>
            </div>
          </form>
  )
}


AuthControlForm = reduxForm ({
  form: 'authControlForm',
}) (AuthControlForm)

export default AuthControlForm
