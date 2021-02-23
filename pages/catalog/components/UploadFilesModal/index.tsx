import {
    createCatalog,
    createFiles,
    fetchCatalogList,
    resetCatalogList,
    updateCatalog
} from "components/catalog/actions";
import {modalClose} from "components/Modal/actions";
import Modal from 'components/ui/Modal'
import CreateFolderForm from "pages/catalog/components/CreateFolder/Form";
import UploadFilesForm from "pages/catalog/components/UploadFilesModal/Form";
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import styles from './index.module.scss'
import {put} from "redux-saga/effects";
import {IRootState} from "../../../../types";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    filesFromDropZone: File[]
}

export default function UploadFilesModal(props: Props) {
    const dispatch = useDispatch()
    const currentCatalogId = useSelector((state: IRootState) => state.catalog.currentCatalogId)

    const [files, setFiles] = useState([])
    const handleSubmit = (data) => {
        console.log('handleSubmit', data)
        if (!data.files.find(file => !file.name)) {
            dispatch(createFiles(data.files))
        }
    }
    const handleChange = (data) => {
        setFiles(data.files || []);
    }
    const handleClose = (isCloseBtn) => {
        console.log("isCloseBtn", isCloseBtn)
        if (files.length > 0) {
            return;
        }
        dispatch(modalClose());
        dispatch(resetCatalogList());
        dispatch(fetchCatalogList(currentCatalogId, 1, 30));
        props.onClose();
    }
    return (
        <Modal {...props} title="Загрузка файлов" closeBtn={files.length === 0} onRequestClose={handleClose}>
            <UploadFilesForm filesFromDropZone={props.filesFromDropZone} onSubmit={handleSubmit} onChange={handleChange}/>
        </Modal>
    )
}
