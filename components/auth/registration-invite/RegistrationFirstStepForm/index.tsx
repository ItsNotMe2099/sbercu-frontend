import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Input'
import { minL, passwordsMatch, required } from 'utils/validations'
import styles from './index.module.scss'

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
                        validate={required}
                    />
                </div>
                <div className={styles.inputContainer}>

                    <Field
                        name="firstName"
                        label="Имя"
                        component={Input}
                        validate={required}
                    />
                </div>
                <div className={styles.inputContainer}>

                    <Field
                        name="lastName"
                        label="Фамилия"
                        component={Input}
                        validate={required}
                    />
                </div>
                <span>
                    <a href="#" className={styles.next} onClick={handleSubmit}>Далее →</a>
                    <a href="/" className={styles.enter}>или Войти</a>
                </span>
            </div>


        </form>
    )
}


RegistrationFirstStepForm = reduxForm({
    form: 'registrationFirstStepForm',
})(RegistrationFirstStepForm)

export default RegistrationFirstStepForm
