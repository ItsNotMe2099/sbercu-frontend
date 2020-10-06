import React from 'react'
import styles from './index.module.scss'

interface Props {
  placeholder?: string
  meta: any
  input
  label
  type
}

interface State {
  isShown: boolean
}

class InputPassword extends React.Component<Props, State> {

  state = {
    isShown: false,
  }

  handleClick = () => {
    if(this.state.isShown) {
      this.setState({
        isShown: false,
      })
    }
    else {
      this.setState({
        isShown: true,
      })
    }
  }

  render() {
  const { error, touched } = this.props.meta
  const { input, label, type } = this.props

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type={this.state.isShown ? 'text' : 'password'}
        placeholder={label}
        {...input}
      />
      <a href="#" onClick={this.handleClick}>
        {this.state.isShown ? <img className={styles.icon} src={`img/field/shown.svg`} alt="" /> : <img className={styles.icon} src={`img/field/notShown.svg`} alt="" />}
      </a>
      {error &&
        touched && (
        <div>
          {error}
        </div>)}
    </div>
  )
}
}

export default InputPassword
