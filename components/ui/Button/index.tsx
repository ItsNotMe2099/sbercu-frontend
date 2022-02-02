import styles from './index.module.scss'
import PlusSvg from 'components/svg/PlusSvg'
import Search from 'components/svg/Search'
import Folder from 'components/svg/Folder'
import CreateGroup from 'components/svg/CreateGroup'
import Invite from 'components/svg/Invite'
import Arrow from 'components/svg/Arrow'
import Cross from 'components/svg/Cross'

interface Props {
  className?: string
  type?: "submit" | "button"
  children?: React.ReactNode
  visiblePlus?: boolean
  folder?: boolean
  search?: boolean
  cross?: boolean
  green?: boolean
  red?: boolean
  white?: boolean
  transparent?: boolean
  notActive?: boolean
  size?: string
  textDarkGrey?: boolean
  textLightGrey?: boolean
  textWhite?: boolean
  textGreen?: boolean
  textRed?: boolean
  closeBtn?: boolean
  btnLightGrey?: boolean
  btnDarkGrey?: boolean
  btnGreen?: boolean
  btnWhite?: boolean
  brdrDarkGrey?: boolean
  brdrLightGrey?: boolean
  brdrGreen?: boolean
  brdrRed?: boolean
  createGroup?: boolean
  invite?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default function Button(props: Props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
        ${styles.root}
        ${props.green && styles.green}
        ${props.red && styles.red}
        ${props.white && styles.white}
        ${props.notActive && styles.notActive}
        ${props.transparent && styles.transparent}
        ${props.textDarkGrey && styles.text__darkGrey}
        ${props.textLightGrey && styles.text__lightGrey}
        ${props.textGreen && styles.text__green}
        ${props.textRed && styles.text__red}
        ${props.textWhite && styles.text__white}
        ${props.closeBtn && styles.closeBtn}
        ${props.brdrLightGrey && styles.brdr__lightGrey}
        ${props.brdrDarkGrey && styles.brdr__darkGrey}
        ${props.brdrGreen && styles.brdr__green}
      ${props.brdrRed && styles.brdr__red}
        ${props.className}
      `}
      style={{padding: props.size}}
    >
    {props.visiblePlus && (
      <div  className={`
      ${props.btnLightGrey && styles.btn__lightGrey}
      ${props.btnDarkGrey && styles.btn__darkGrey}
      ${props.btnWhite && styles.btn__white}
      ${props.btnGreen && styles.btn__green}
      ${props.btnGreen && props.disabled && styles.disabled}
             ${styles.plus}
      `}><PlusSvg /></div>
    )}
    {props.search && (
      <Search />
    )}
    {props.cross && (
      <Cross/>
    )}
    {props.folder && (
      <div className={`
      ${props.btnDarkGrey && styles.btn__darkGrey}
      ${props.btnGreen && styles.btn__green}
          ${styles.folder}
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

Button.defaultProps = {
  type: 'submit'
}
