import React, { useState } from 'react'
import styles from './index.module.scss'
import EmailForm from './EmailForm'
import NewPWForm from './NewPWForm'
import PasswordRecoveryHeader from './PWRecoveryHeader'

interface Props {
  route: string
}

export default function PasswordRecovery(props: Props) {
    return (
      <PasswordRecoveryHeader />
    )
  }
