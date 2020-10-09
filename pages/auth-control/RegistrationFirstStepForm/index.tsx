import { useState } from "react";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Input'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import InputPassword from 'components/ui/InputPassword'
import Link from 'next/link'
import { regFirstStep, regFirstStepBack } from 'pages/auth-control/actions'
import Button from 'components/ui/Button'
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
                        validate={required}
                    />
                </div>
                <div className={styles.inputContainer}>

                    <Field
                        name="first-name"
                        label="Имя"
                        component={Input}
                        validate={required}
                    />
                </div>
                <div className={styles.inputContainer}>

                    <Field
                        name="last-name"
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
