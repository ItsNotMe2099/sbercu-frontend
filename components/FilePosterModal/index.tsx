import { createCatalog, updateCatalog, updateFile } from "components/catalog/actions";
import FilePosterForm from "components/FilePosterModal/Form";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import FileEditForm from "components/FilePosterModal/Form";
import { ICatalogEntry, IRootState } from "types";
import CreateFolderForm from './Form'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'


interface Props {
  file?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function FilePosterModal(props: Props){
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    dispatch(updateFile(props.file?.id,{ poster: data.poster}));
    console.log('success')
  }

  return (
    <Modal {...props} title={props.file.poster ? "Изменить обложку" : "Загрузить обложку"}>
        <FilePosterForm onSubmit={handleSubmit} initialValues={{...props.file}}/>
    </Modal>
  )
}
