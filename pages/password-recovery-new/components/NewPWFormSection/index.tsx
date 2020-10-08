import { passwordResetReset, passwordResetSubmit } from "pages/password-recovery-new/actions";
import React from 'react'
import { useDispatch } from 'react-redux'
import { clickOnSave } from 'actions'
import { getParameterByName } from "utils/helpers";
import NewPWForm from './NewPWForm'

interface Props {}

export default function NewPWFormSection(props: Props) {

  const dispatch = useDispatch()
  const submit = values => {
    console.log("Props", getParameterByName('token'))
    dispatch(passwordResetReset());
      dispatch(passwordResetSubmit({password: values.new_password, resetPasswordToken : getParameterByName('token')}))
  }
    return (

          <NewPWForm onSubmit={submit}/>
    )
  }
