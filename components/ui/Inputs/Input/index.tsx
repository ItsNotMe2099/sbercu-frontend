import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import styles from './index.module.scss'


interface Props {
  placeholder?: string
  meta: any
  input
  label
  type,
  disabled?: boolean
  tip?: string
  isLabel?: boolean
}

export default function Input(props: Props) {
  const { error, touched } = props.meta
  const { input, label, type } = props
  return (
    <div className={styles.root}>
      {props.isLabel ?
      <div className={styles.label}>{props.label}</div>
      :
      null
      }
      <input
        className={`${styles.input} ${(error && touched) && styles.error}`}
        type={type}
        disabled={props.disabled}
        placeholder={props.placeholder}
        {...input}
      />
        <ErrorInput {...props}/>
    </div>
  )
}
