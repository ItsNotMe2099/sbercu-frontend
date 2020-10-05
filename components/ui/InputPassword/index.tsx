import styles from './index.module.scss'

interface Props {
  placeholder?: string
  meta: any
  isShown: boolean
  onClick?: (e: React.MouseEvent) => void
  input
  label
  type
}

const isShown = () => {
  var input = document.getElementById('password-input')
  if(input.getAttribute('type') === 'password') {
    return true
  }
  else {
    return false
  }
}

export default function InputPassword(props: Props) {
  const { error, touched } = props.meta
  const { input, label, type } = props
  return (
    <div className={styles.root}>
      <input
        id='password-input'
        className={styles.input}
        type={props.isShown ? 'text' : 'password'}
        placeholder={label}
        {...input}
      />
      <a href="#" onClick={isShown}>
        {props.isShown ? <img src={`shown.svg`} alt="" /> : <img src={`notShown.svg`} alt="" />}
      </a>
      {error &&
        touched && (
        <div>
          {error}
        </div>)}
    </div>
  )
}
