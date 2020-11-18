import styles from './index.module.scss'
import PlusSvg from 'components/svg/PlusSvg'
import Search from 'components/svg/Search'

interface Props {
  children?: React.ReactNode
  visiblePlus?: boolean
  vvlarge?: boolean
  vlarge?: boolean
  large?: boolean
  medium?: boolean
  small?: boolean
  search?: boolean
  green?: boolean
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
        ${props.green && styles.green}
      `}
    >
    {props.visiblePlus && (
      <PlusSvg />
    )}
    {props.search && (
      <Search />
    )}
    <span>{props.children}</span>
    </button>
  )
}
