import { createCatalog, updateCatalog } from "components/catalog/actions";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import { ICatalogEntry, IRootState } from "types";
import CreateFolderForm from './Form'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'


interface Props {
  catalog?: ICatalogEntry
}

export default function CreateFolder(props){
  const dispatch = useDispatch()
  const currentCatalogId = useSelector((state: IRootState) => state.catalog.currentCatalogId)
  const handleSubmit = (data) => {
    if(props.catalog){
      dispatch(updateCatalog(props.catalog?.id,{ name: data.name}));
    }else {
      dispatch(createCatalog({ name: data.name, entryType: 'folder', parentId: currentCatalogId }));
    }
    console.log('success')
  }

  return (
    <Modal {...props} title={props.catalog ? 'Редактирование папки' : 'Создание новой папки'} cancel="Отменить">
        <CreateFolderForm onSubmit={handleSubmit} initialValues={{...props.catalog}}/>
    </Modal>
  )
}
