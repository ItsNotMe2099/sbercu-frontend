import { createCatalog, updateCatalog, updateFile } from "components/catalog/actions";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import FileEditForm from "components/FileEditModal/Form";
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
  const {catalog} = props;
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    const speakersIds = data.presenters.filter(i => i?.id).map(i =>parseInt( i.id, 10));
    const presenters = data.presenters.filter(i => !i?.id)
    console.log("data.presenters", speakersIds, presenters);

    dispatch(updateFile(props.catalog?.id,{ name: data.name, presenters: presenters, speakersIds }));
    console.log('success')
  }
  if(!catalog){
    return null;
  }
  return (
    <Modal {...props} title="Редактирование файла">
        <FileEditForm onSubmit={handleSubmit} initialValues={{...props.catalog, presenters: [...(catalog.speakers ? catalog.speakers : []),...(catalog.presenters ? catalog.presenters : [])]}}/>
    </Modal>
  )
}
