import { createCatalog, createFile, createFiles, updateCatalog } from "components/catalog/actions";
import { modalClose } from "components/Modal/actions";
import Modal from 'components/ui/Modal'
import CreateFolderForm from "pages/catalog/components/CreateFolder/Form";
import UploadFilesForm from "pages/catalog/components/UploadFilesModal/Form";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

interface Props {
    isOpen: boolean,
}

export default function UploadFilesModal(props: Props){
  const dispatch = useDispatch()
    const [files, setFiles] = useState([])
    const handleSubmit = (data) => {
        console.log('handleSubmit', data)
        if(!data.files.find(file => !file.name)) {
            dispatch(createFiles(data.files))
        }
    }
    const handleChange = (data) => {
      setFiles(data.files || []);
    }
    const handleClose = (isCloseBtn) => {
            console.log("isCloseBtn", isCloseBtn)
            if(!isCloseBtn && files.length > 0){
                return;
            }
            dispatch(modalClose());
    }
  return (
    <Modal {...props} title="Загрузка файлов" closeBtn onRequestClose={handleClose}>
        <UploadFilesForm onSubmit={handleSubmit} onChange={handleChange}/>
    </Modal>
  )
}
