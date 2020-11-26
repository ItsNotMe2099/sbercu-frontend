import { createCatalog } from "components/catalog/actions";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import { IRootState } from "types";
import CreateFolderForm from './Form'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createFolderSubmit } from './actions'


export default function CreateFolder(props){
  const dispatch = useDispatch()
  const currentCatalogId = useSelector((state: IRootState) => state.catalog.currentCatalogId)
  const handleSubmit = (data) => {
    dispatch(createCatalog({name: data.name, entryType: 'folder', parentId: currentCatalogId}));
    console.log('success')
  }

  return (
    <Modal {...props} title="Создание новой папки" cancel="Отменить">
        <CreateFolderForm onSubmit={handleSubmit}/>
    </Modal>
  )
}
