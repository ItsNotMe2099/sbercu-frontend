import styles from './index.module.scss'
import PlusSvg from '../../svg/PlusSvg'

interface Props {
  children: React.ReactNode
  visiblePlus?: boolean
  vvlarge?: boolean
  vlarge?: boolean
  large?: boolean
  medium?: boolean
  small?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={`
        ${styles.root}
        ${props.vvlarge && styles.vvlarge}
        ${props.vlarge && styles.vlarge}
        ${props.large && styles.large}
        ${props.medium && styles.medium}
        ${props.small && styles.small}
      `}
    >
    {props.visiblePlus && (
      <PlusSvg />
    )}
    <span>{props.children}</span>
    </button>
  )
}
