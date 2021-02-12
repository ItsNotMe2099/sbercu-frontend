import Button from 'components/ui/Button'
import styles from './index.module.scss'
import ReactModal from 'react-modal'


interface Props {
  isOpen: boolean
  onRequestClose?: (isCloseBtn) => void,
  title?: string,
  children?: any,
  closeBtn?: boolean
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
      borderRadius: '5px',
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
    onRequestClose={() => props.onRequestClose(false)}
    >
      <div className={styles.frame} >
        <div className={styles.overlay} onClick={() => props.onRequestClose(false)}/>
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.title}>{props.title}</div>
          {props.closeBtn ?
            <div className={styles.btnContainer}><Button closeBtn onClick={() => props.onRequestClose(true)}></Button></div>
          :
          null}
        </div>
        <div className={styles.children}>{props.children}</div>
      </div>
      </div>
    </ReactModal>
  )
}
