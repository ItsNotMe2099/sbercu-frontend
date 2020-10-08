import React from 'react'
import { useDispatch } from 'react-redux'
import { clickOnSave } from 'actions'
import NewPWForm from './NewPWForm'

interface Props {}

export default function NewPWFormSection(props: Props) {
  const dispatch = useDispatch()
  const submit = values => {
      dispatch(clickOnSave({password: values.new_password, resetPasswordToken : "kulmVQeBpXclApM84BBvhBSaYcuSV8zX"}))
  }
    return (

          <NewPWForm onSubmit={submit}/>
    )
  }
