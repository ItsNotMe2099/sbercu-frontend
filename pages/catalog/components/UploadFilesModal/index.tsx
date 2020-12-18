import { createCatalog, createFile, createFiles, updateCatalog } from "components/catalog/actions";
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
        dispatch(createFiles(data.files))
    }
  return (
    <Modal {...props} title="Загрузка файлов" closeBtn>

        <UploadFilesForm onSubmit={handleSubmit}/>
    </Modal>
  )
}
