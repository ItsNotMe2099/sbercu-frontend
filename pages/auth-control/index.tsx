import { regSubmit } from "pages/auth-control/actions";
import RegistrationFirstStepForm from "pages/auth-control/RegistrationFirstStepForm";
import RegistrationSecondStepForm from "pages/auth-control/RegistrationSecondStepForm";
import React, { useState } from 'react'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'

interface Props {}

export default function AuthControl(props: Props) {
    const dispatch = useDispatch()
    const [firstStepIsComplete, setFirstStepIsComplete] = useState(false)

    const [formData, setFormData] = useState({})
    const handleFirstStepSubmit = values => {
        setFirstStepIsComplete(true);
        setFormData(values);

    }
    const handleSecondStepSubmit = values => {
        dispatch(regSubmit({...formData, ...values}))
    }
    const handleSecondStepGoBack = () => {
        setFirstStepIsComplete(false);
    }
    return (
      <div className={styles.container}>
          <div className={styles.head}>media.</div>
          <div className={styles.reg}>Регистрация пользователя</div>
          {!firstStepIsComplete ? <RegistrationFirstStepForm initialValues={formData} onSubmit={handleFirstStepSubmit}/> : <RegistrationSecondStepForm onSubmit={handleSecondStepSubmit} onGoBack={handleSecondStepGoBack}/>}
      </div>
    )
  }
