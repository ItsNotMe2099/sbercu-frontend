import Modal from 'components/ui/Modal'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

interface Props {
    isOpen: boolean,
    onRequestClose: () => void
}

export default function UploadFilesModal(props: Props){
  const dispatch = useDispatch()

  return (
    <Modal {...props} title="Загрузка файлов" closeBtn>
      <div className={styles.container}>
       <a className={styles.iconText}>
        <img src="/img/icons/attach_file.svg" alt=''/>
       <span>Перенесите сюда файл или нажмите<br/> для выбора файла на компьютере</span>
       </a>
      </div>
    </Modal>
  )
}
