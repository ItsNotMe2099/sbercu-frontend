import styles from './index.module.scss'
import PlusSvg from 'components/svg/PlusSvg'
import Search from 'components/svg/Search'
import Folder from 'components/svg/Folder'
import CreateGroup from 'components/svg/CreateGroup'
import Invite from 'components/svg/Invite'

interface Props {
  children?: React.ReactNode
  visiblePlus?: boolean
  folder?: boolean
  search?: boolean
  green?: boolean
  white?: boolean
  transparent?: boolean
  notActive?: boolean
  size?: string
  textDarkGrey?: boolean
  textLightGrey?: boolean
  textWhite?: boolean
  textGreen?: boolean
  closeBtn?: boolean
  btnLightGrey?: boolean
  btnDarkGrey?: boolean
  btnGreen?: boolean
  btnWhite?: boolean
  brdrDarkGrey?: boolean
  createGroup?: boolean
  invite?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={`
        ${styles.root}
        ${props.green && styles.green}
        ${props.white && styles.white}
        ${props.notActive && styles.notActive}
        ${props.transparent && styles.transparent}
        ${props.textDarkGrey && styles.text__darkGrey}
        ${props.textLightGrey && styles.text__lightGrey}
        ${props.textGreen && styles.text__green}
        ${props.textWhite && styles.text__white}
        ${props.closeBtn && styles.closeBtn}
        ${props.brdrDarkGrey && styles.brdr__darkGrey}
      `}
      style={{padding: props.size}}
    >
    {props.visiblePlus && (
      <div style={{width: '20px', height: '20px', marginRight: '11px'}} className={`
      ${props.btnLightGrey && styles.btn__lightGrey}
      ${props.btnDarkGrey && styles.btn__darkGrey}
      ${props.btnWhite && styles.btn__white}
      ${props.btnGreen && styles.btn__green}
      `}><PlusSvg /></div>
    )}
    {props.search && (
      <Search />
    )}
    {props.folder && (
      <div style={{marginRight: '11px'}}className={`
      ${props.btnDarkGrey && styles.btn__darkGrey}
      ${props.btnGreen && styles.btn__green}
      `}><Folder /></div>
    )}
    {props.createGroup && (
      <div style={{marginRight: '11px'}}><CreateGroup /></div>
    )}
    {props.invite && (
      <div style={{marginRight: '11px'}}><Invite /></div>
    )}
    <span>{props.children}</span>
    </button>
  )
}
