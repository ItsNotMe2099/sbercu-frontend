import { resetState } from 'actions'
import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

interface Props {
  placeholder?: string
  meta: any
  input
  label
  type
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function InputPassword(props: Props) {

  const dispatch = useDispatch()
  const [isShown, setIsShown] = useState(false)
  const { error, touched } = props.meta
  const { input, label, type } = props

  return (
    <div className={styles.root}>
      <input
        onChange={dispatch(resetState())}
        className={styles.input}
        type={isShown ? 'text' : 'password'}
        placeholder={label}
        {...input}
      />
      {isShown ?
      <a href="#" onClick={() => setIsShown(false)}>
        <img className={styles.icon} src={`img/field/shown.svg`} alt="" /> 
      </a>
      :
      <a href="#" onClick={() => setIsShown(true)}>
        <img className={styles.icon} src={`img/field/notShown.svg`} alt="" />
      </a>}
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </div>
  )
}
