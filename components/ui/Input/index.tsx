import styles from './index.module.scss'
import { useDispatch } from 'react-redux'


interface Props {
  placeholder?: string
  meta: any
  input
  label
  type,
  disabled?: boolean,
}

export default function Input(props: Props) {
  const dispatch = useDispatch()
  const { error, touched } = props.meta
  const { input, label, type } = props
  return (
    <div className={styles.root}>
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
