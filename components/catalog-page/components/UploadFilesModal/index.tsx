import {
    createCatalog,
    createFiles,
    fetchCatalogList,
    resetCatalogList,
    updateCatalog
} from "components/catalog/actions";
import {modalClose} from "components/Modal/actions";
import Modal from 'components/ui/Modal'
import CreateFolderForm from "components/catalog-page/components/CreateFolder/Form";
import UploadFilesForm from "components/catalog-page/components/UploadFilesModal/Form";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import styles from 'components/catalog-page/components/UploadFilesModal/index.module.scss'
import {put} from "redux-saga/effects";
import {IRootState} from "types";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    filesFromDropZone: File[]
}

export default function UploadFilesModal(props: Props) {
    const dispatch = useDispatch()
    const currentCatalogId = useSelector((state: IRootState) => state.catalog.currentCatalogId)

    const [allowBgClose, setAllowBgClose] = useState(true);
    const [files, setFiles] = useState([])
    useEffect(() => {
        return () => {
            if(   (window as any)._fileUploads){
                for(const file of (window as any)._fileUploads){
                    try{
                        file.cancel();
                    }catch (e){

                    }
                }
            }
            (window as any)._fileUploads = [];
        }
    }, [])
    const handleSubmit = (data) => {
         if(data.files.filter(file =>  file.name && /^ *$/.test(file.name) || !file.name).length > 0) {
           return;
        }
        if (!data.files.find(file => !file.name)) {
            dispatch(createFiles(data.files))
        }
    }
    const handleChange = (data) => {
        setFiles(data.files || []);
    }
    const handleSyncFiles = (files) => {
        if(files.filter(item => !item.path).length > 0){
            setAllowBgClose(false);
        }else{
            setAllowBgClose(true);
        }
    }
    const handleClose = (isCloseBtn) => {
        if(!isCloseBtn && !allowBgClose){
            return;
        }
        if (files.length > 0 && !allowBgClose) {
            return;
        }
        dispatch(modalClose());
        dispatch(resetCatalogList());
        dispatch(fetchCatalogList(currentCatalogId, 1, 30));
        props.onClose();
    }
    return (
        <Modal {...props} title="Загрузка файлов" closeBtn={files.length === 0} onRequestClose={handleClose}>
            <UploadFilesForm onSyncFiles={handleSyncFiles} filesFromDropZone={props.filesFromDropZone} onSubmit={handleSubmit} onChange={handleChange}/>
        </Modal>
    )
}
