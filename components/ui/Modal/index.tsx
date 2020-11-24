import Button from 'components/ui/Button'
import styles from './index.module.scss'
import ReactModal from 'react-modal'


interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
  title?: string,
  children?: any,
  closeBtn?: boolean
  cancel: string
}

export default function Modal(props: Props) {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      zIndex: '4',
    },
    content : {
      width: '441px',
      borderRadius: '21px',
      padding: '0',
      border: '0',
      margin: 'auto',
      position: 'static',
      inset: '0',
      overflow: 'hidden',
    },
  }
  return (
    <ReactModal
    style={customStyles}
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    >
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.title}>{props.title}</div>
          {props.closeBtn ?
            <Button closeBtn onClick={props.onRequestClose}></Button>
          :
          null}
        </div>
        <div>
        {props.children}
        <Button transparent onClick={props.onRequestClose} type="button">{props.cancel}</Button>
        </div>
      </div>
    </ReactModal>
  )
}
