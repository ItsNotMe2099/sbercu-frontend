import { createCatalog, updateCatalog, updateFile } from "components/catalog/actions";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import FileEditForm from "pages/catalog/components/FileEditModal/Form";
import { ICatalogEntry, IRootState } from "types";
import CreateFolderForm from './Form'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'


interface Props {
  catalog?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function FileEditModal(props: Props){
  const dispatch = useDispatch()
  const currentCatalogId = useSelector((state: IRootState) => state.catalog.currentCatalogId)
  const handleSubmit = (data) => {
    dispatch(updateFile(props.catalog?.id,{ name: data.name, presenters: data.presenters}));
    console.log('success')
  }

  return (
    <Modal {...props} title="Редактирование файла">
        <FileEditForm onSubmit={handleSubmit} initialValues={{...props.catalog}}/>
    </Modal>
  )
}
