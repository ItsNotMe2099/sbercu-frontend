import {catalogPaste, createCatalog, resetCatalogForm, updateCatalog} from "components/catalog/actions";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import { ICatalogEntry, IRootState } from "types";
import CreateFolderForm from 'components/catalog-page/components/PasteCatalogItem/Form'
import styles from 'components/catalog-page/components/PasteCatalogItem/index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'
import PasteCatalogItemForm from 'components/catalog-page/components/PasteCatalogItem/Form'


interface Props {
  catalog?: ICatalogEntry
}

export default function PasteCatalogItem(props){
  const {catalog} = props;
  const dispatch = useDispatch()
  const currentCatalogId = useSelector((state: IRootState) => state.catalog.currentCatalogId)
  const copyItem = process.browser ? JSON.parse(localStorage.getItem('copyCatalog')) : null;

  const handleSubmit = (data) => {
  dispatch(catalogPaste(catalog.id, data.name));
  }
  useEffect(() => {
    return () => dispatch(resetCatalogForm());
  }, [])

  return (
    <Modal {...props} title={ `Перенос ${copyItem?.entryType === 'file' ? 'файла' : 'папки'} «${copyItem?.name}»`} cancel="Отменить">
        <PasteCatalogItemForm onSubmit={handleSubmit} initialValues={{name: copyItem?.name}}/>
    </Modal>
  )
}
