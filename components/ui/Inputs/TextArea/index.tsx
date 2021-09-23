import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import styles from './index.module.scss'

interface Props {
  meta: any,
  placeholder?: string
  input
  label
  type,
  disabled?: boolean
}

export default function TextArea(props: Props) {
  const { error, touched } = props.meta
  const { input, label, type } = props
  return (
    <div className={styles.root}>
      <textarea

        className={`${styles.textarea} ${(error && touched) && styles.textareaError}`}
        type={type}
        disabled={props.disabled}
        placeholder={label}
        {...input}
      />
      <ErrorInput {...props.meta}/>
    </div>
  )
}
