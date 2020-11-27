import { getUserByInvite, regSubmit } from "components/auth/registration-invite/actions";
import RegistrationFirstStepForm from "components/auth/registration-invite/RegistrationFirstStepForm";
import RegistrationSecondStepForm from "components/auth/registration-invite/RegistrationSecondStepForm";
import { useRouter } from "next/router";
import { IRootState } from "types";

import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
}

export default function AuthControl(props: Props) {
    const dispatch = useDispatch()
    const [firstStepIsComplete, setFirstStepIsComplete] = useState(false)
    const router = useRouter()
    const { token } = router.query
    const currentUser = useSelector((state: IRootState) => state.regReducer.currentUser)
    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (token) {
            dispatch(getUserByInvite({ token: token as string }));
        }
    }, [token])
    useEffect(() => {
        if (currentUser) {
            console.log("currentUser", currentUser)
        }
    }, [currentUser])
    const handleFirstStepSubmit = useCallback(values => {
        setFirstStepIsComplete(true);
        setFormData(values);

    }, [formData, firstStepIsComplete])
    const handleSecondStepSubmit = useCallback(values => {
        dispatch(regSubmit({ ...formData, password: values.new_password as string, inviteToken: token as string, id: undefined, role: undefined }))
    }, [formData, firstStepIsComplete, token])
    const handleSecondStepGoBack = () => {
        setFirstStepIsComplete(false);
    }
    return (
        <div className={styles.container}>
            {currentUser && currentUser.email ? (<>
                <div className={styles.head}>media.</div>
                <div className={styles.reg}>Регистрация пользователя</div>
                {!firstStepIsComplete ? <RegistrationFirstStepForm initialValues={{ ...currentUser, ...formData }}
                                                                   onSubmit={handleFirstStepSubmit}/> :
                    <RegistrationSecondStepForm onSubmit={handleSecondStepSubmit} onGoBack={handleSecondStepGoBack}/>}
            </>) : null}
        </div>
    )
}
