import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import InputPassword from 'components/ui/Inputs/InputPassword'
import Button from 'components/ui/Button'
import { IRootState } from "types";
import { minL, passwordsMatch, required } from 'utils/validations'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
interface Props {
    onGoBack: () => void,
    onSubmit: (any) => void,
    handleSubmit?: (any) => void
}

let RegistrationSecondStepForm = (props: Props) => {
    const formError = useSelector((state: IRootState) => state.regReducer.formError)
    const formLoading = useSelector((state: IRootState) => state.regReducer.formLoading)
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <a href="#" onClick={props.onGoBack} className={styles.back}>Назад</a>
                <div className={styles.head}>Придумайте пароль</div>
                <div className={styles.tip}>Должен содержать не менее 8 символов, заглавные, строчные латинские буквы и небуквенные
                    символы
                </div>
                <div className={styles.inputContainer}>
                    <Field
                        name="new_password"
                        component={InputPassword}
                        label="Пароль"
                        validate={[required, passwordsMatch, minL]}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Field
                        name="new_password_confirm"
                        label="Повторите пароль"
                        component={InputPassword}
                        validate={[required, passwordsMatch, minL]}
                    />
                </div>
            </div>
            <FormError error={formError}/>
            <Button green size="9px 16px" disabled={formLoading}>Зарегистрироваться</Button>

        </form>
    )
}


RegistrationSecondStepForm = reduxForm({
    form: 'registrationSecondStepForm',
})(RegistrationSecondStepForm)

export default RegistrationSecondStepForm
