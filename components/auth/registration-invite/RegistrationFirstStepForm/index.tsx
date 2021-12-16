import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import { minL, passwordsMatch, required } from 'utils/validations'
import styles from './index.module.scss'
import Button from 'components/ui/Button'

let RegistrationFirstStepForm = props => {
    const { handleSubmit } = props

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className={styles.head}>Проверьте данные о себе</div>
                <div className={styles.inputContainer}>
                    <Field
                        name="email"
                        component={Input}
                        label="Почта"
                        disabled={true}
                        hasAutoComplete={true}
                        validate={required}
                    />
                </div>
                <div className={styles.inputContainer}>

                    <Field
                        name="firstName"
                        label="Имя"
                        component={Input}
                        hasAutoComplete={true}
                        validate={required}
                    />
                </div>
                <div className={styles.inputContainer}>

                    <Field
                        name="lastName"
                        label="Фамилия"
                        component={Input}
                        hasAutoComplete={true}
                        validate={required}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button green size="9px 16px">Далее</Button>

                    <a href="/" className={styles.enter}>или Войти</a>
                </div>
            </div>


        </form>
    )
}


RegistrationFirstStepForm = reduxForm({
    form: 'registrationFirstStepForm',
})(RegistrationFirstStepForm)

export default RegistrationFirstStepForm
