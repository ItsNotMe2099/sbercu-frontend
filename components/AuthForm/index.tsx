import { Field, reduxForm } from 'redux-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import InputPassword from '../ui/InputPassword'

let AuthForm = props => {
  const { handleSubmit } = props
  return (
        <form onSubmit={handleSubmit}>
            <Field
              name="name"
              component={Input}
              label="Your Name"
            />
            <Field
              name="email"
              label="Your Email"
              component={InputPassword}
            />
            <Button large visiblePlus>Загрузить файлы</Button>
        </form>
  )
}


AuthForm = reduxForm ({
  form: 'authForm',
}) (AuthForm)

export default AuthForm