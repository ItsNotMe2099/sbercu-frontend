import styles from './index.module.scss'

interface Props {
  placeholder?: string
  meta: any
  isShown: boolean
  input
  label
  type
}

export default function InputPassword(props: Props) {
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
      <a href="#">
      {props.isShown ? <img src={`./shown.svg`} alt="" /> : <img src={`./notShown.svg`} alt="" />}
      </a>
      {error &&
        touched && (
        <div>
          {error}
        </div>)}
    </div>
  )
}
