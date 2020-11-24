import styles from './index.module.scss'


interface Props {
  placeholder?: string
  meta: any
  input
  label
  type,
  disabled?: boolean
  tip?: string
}

export default function Input(props: Props) {
  const { error, touched } = props.meta
  const { input, label, type } = props
  return (
    <div className={styles.root}>
      <div className={styles.tip}>{props.tip}</div>
      <input
        className={styles.input}
        type={type}
        disabled={props.disabled}
        placeholder={label}
        {...input}
      />
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </div>
  )
}
