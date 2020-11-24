import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import CreateFolderForm from './Form'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createFolderSubmit } from './actions'


export default function CreateFolder(props){
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    dispatch(createFolderSubmit(data));
  }


  return (
    <Modal {...props} title="Создание новой папки" cancel="Отменить">
        <CreateFolderForm onSubmit={handleSubmit}/>
    </Modal>
  )
}
