import { createCatalog, updateCatalog } from "components/catalog/actions";
import Modal from 'components/ui/Modal'
import CreateFolderForm from "pages/catalog/components/CreateFolder/Form";
import UploadFilesForm from "pages/catalog/components/UploadFilesModal/Form";
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

interface Props {
    isOpen: boolean,
    onRequestClose: () => void
}

export default function UploadFilesModal(props: Props){
  const dispatch = useDispatch()
    const handleSubmit = (data) => {
        console.log('handleSubmit', data)
    }
  return (
    <Modal {...props} title="Загрузка файлов" closeBtn>

        <UploadFilesForm onSubmit={handleSubmit}/>
      <div className={styles.container}>
       <a className={styles.iconText}>
        <img src="/img/icons/attach_file.svg" alt=''/>
       <span>Перенесите сюда файл или нажмите<br/> для выбора файла на компьютере</span>
       </a>
      </div>
    </Modal>
  )
}
