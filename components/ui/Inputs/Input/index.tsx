import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import { useEffect } from "react";
import styles from './index.module.scss'
import InputMask from 'react-input-mask'


interface Props {
  placeholder?: string
  meta?: any
  input
  label
  type,
  disabled?: boolean
  tip?: string
  isLabel?: boolean,
  mask?: string,
  className?: string
  autoFocus?: boolean
}

export default function Input(props: Props) {
  const { error, touched } = props.meta
  const { input, label, type } = props
  useEffect(() => {
    console.log("destroy");
  }, [])
  return (
    <div className={`${styles.root} ${props.className && props.className}`}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      {props.mask ? (
          <InputMask    className={`${styles.input} ${(error && touched) && styles.error}`}
                        type={type}
                        autoComplete={'off'}
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                        autoFocus={props.autoFocus}
                        {...input}
                        mask={props.mask} />
      ) : (
          <input
              className={`${styles.input} ${(error && touched) && styles.error}`}
              type={type}
              autoComplete={'off'}
              disabled={props.disabled}
              placeholder={props.placeholder}
              autoFocus={props.autoFocus}
              {...input}
          />
      )}
        <ErrorInput {...props}/>
    </div>
  )
}
