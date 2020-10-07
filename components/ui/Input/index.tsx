import { resetState } from 'actions'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  placeholder?: string
  meta: any
  input
  label
  type
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Input(props: Props) {
  const dispatch = useDispatch()
  const { error, touched } = props.meta
  const { input, label, type } = props
  return (
    <div className={styles.root}>
      <input
        onChange={dispatch(resetState())}
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
