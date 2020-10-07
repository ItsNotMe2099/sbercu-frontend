import styles from './index.module.scss'

interface Props {
  placeholder?: string
  meta: any
  input
  label
  type
}

export default function Input(props: Props) {
  const { error, touched } = props.meta
  const { input, label, type } = props
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type={type}
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
