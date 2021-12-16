import styles from './index.module.scss'

interface Props {
  type?: "submit" | "button"
  children?: React.ReactNode
  transparent?: boolean
  size?: string
  textGreen?: boolean
  brdrGreen?: boolean
  brdrRadiusCircle?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default function TagArrow(props: Props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`
        ${styles.root}
        ${props.transparent && styles.transparent}
        ${props.textGreen && styles.text__green}
        ${props.brdrGreen && styles.brdr__green}
        ${props.brdrRadiusCircle && styles.brdrRadius__circle}
      `}
      style={{padding: props.size}}
    >
    <span>{props.children}</span>
    </button>
  )
}

TagArrow.defaultProps = {
  type: 'submit'
}
