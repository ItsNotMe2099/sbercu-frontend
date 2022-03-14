import { passwordRecoveryReset, passwordRecoverySubmit } from "components/auth/password-forgot/actions";
import React from 'react'
import { useDispatch } from 'react-redux'
import { clickOnSend } from 'actions'
import EmailForm from './EmailForm'

interface Props {}

export default function EmailFormSection(props: Props) {
  const dispatch = useDispatch()
  const submit = values => {
      dispatch(passwordRecoveryReset())
      dispatch(passwordRecoverySubmit({email: values.email}))
  }
    return (

          <EmailForm onSubmit={submit}/>
    )
  }
