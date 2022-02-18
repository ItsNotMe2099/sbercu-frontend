import {createCatalog, resetCatalogForm, updateCatalog} from "components/catalog/actions";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import { ICatalogEntry, IRootState } from "types";
import CreateFolderForm from 'components/catalog-page/components/CreateFolder/Form'
import styles from 'components/catalog-page/components/CreateFolder/index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'


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
  useEffect(() => {
    return () => dispatch(resetCatalogForm());
  }, [])

  return (
    <Modal {...props} title={props.catalog ? 'Редактирование папки' : <div><span className={styles.create}>Создание</span> новой папки</div>} cancel="Отменить">
        <CreateFolderForm onSubmit={handleSubmit} initialValues={{...props.catalog}}/>
    </Modal>
  )
}
