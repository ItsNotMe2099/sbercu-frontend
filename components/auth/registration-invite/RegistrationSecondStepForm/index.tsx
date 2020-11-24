import { Field, reduxForm } from 'redux-form'
import InputPassword from 'components/ui/InputPassword'
import Button from 'components/ui/Button'
import { minL, passwordsMatch, required } from 'utils/validations'
import styles from './index.module.scss'
interface Props {
    onGoBack: () => void,
    onSubmit: (any) => void,
    handleSubmit?: (any) => void
}

let RegistrationSecondStepForm = (props: Props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <a href="#" onClick={props.onGoBack} className={styles.back}>← Назад к данным о себе</a>
                <div className={styles.head}>Придумайте пароль</div>
                <div className={styles.tip}>Должен содержать не менее 8 символов, заглавные, строчные латинские буквы и небуквенные
                    символы
                </div>
                <div className={styles.inputContainer}>
                    <Field
                        name="new_password"
                        component={InputPassword}
                        label="Введите пароль"
                        validate={[required, passwordsMatch, minL]}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Field
                        name="new_password_confirm"
                        label="Введите пароль повторно"
                        component={InputPassword}
                        validate={[required, passwordsMatch, minL]}
                    />
                </div>
            </div>
            <Button green>Зарегистрироваться</Button>


        </form>
    )
}


RegistrationSecondStepForm = reduxForm({
    form: 'registrationSecondStepForm',
})(RegistrationSecondStepForm)

export default RegistrationSecondStepForm
