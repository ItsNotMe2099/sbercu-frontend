import { useRouter } from "next/router";
import { passwordResetReset, passwordResetSubmit } from "components/auth/password-reset/actions";
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import NewPWForm from './NewPWForm'

interface Props {}

export default function NewPWFormSection(props: Props) {
  const router = useRouter()
  const { token } = router.query

  const dispatch = useDispatch()
  const submit = useCallback(values => {
    console.log("Props", token)
    dispatch(passwordResetReset());
      dispatch(passwordResetSubmit({password: values.new_password, resetPasswordToken : token as string}))
  }, [token]);
    return (

          <NewPWForm onSubmit={submit}/>
    )
  }
