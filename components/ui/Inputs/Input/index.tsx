import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import {ReactElement, useEffect} from "react";
import styles from './index.module.scss'
import InputMask from 'react-input-mask'


interface Props {
  placeholder?: string
  meta?: any
  input
  label?: string
  type?: string,
  disabled?: boolean
  tip?: string
  isLabel?: boolean,
  mask?: string,
  maskChar?: string
  className?: string
  autoFocus?: boolean,
  hasAutoComplete?: boolean
  icon?: ReactElement
  onIconClick?: string
}

export default function Input(props: Props) {
  const { error, touched } = props.meta
  const { input, label, type, hasAutoComplete } = props
  const autoCompleteProps: any = !hasAutoComplete ? {autoComplete: 'new-password', autoCorrect: 'off'} : {};

  useEffect(() => {
    console.log("destroy");
  }, [])
  const renderInput = (inputProps) => {
    return  (   <input
      className={`${styles.input} ${(error && touched) && styles.error}`}
      type={type}
      autoComplete={'off'}
      disabled={props.disabled}
      placeholder={props.placeholder}
      {...inputProps}
      {...autoCompleteProps}
    />)
  }

  return (
    <div className={`${styles.root} ${props.className && props.className}`}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <div className={styles.inputWrapper}>
      {props.mask ? (
          <InputMask
            className={`${styles.input} ${(error && touched) && styles.error}`}
                        mask={props.mask}
            disabled={props.disabled}
            {...({value: props.input.value, onChange: props.input.onChange}) }
            maskPlaceholder={''}  alwaysShowMask={false}   maskChar={props.maskChar}>
            {(inputProps) => renderInput(inputProps)}</InputMask>
      ) : (
        renderInput(props.input)
      )}
        {props.icon}
      </div>
        <ErrorInput {...props}/>
    </div>
  )
}
