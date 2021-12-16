import { createCatalog } from "components/catalog/actions";
import { createTagCategory, updateTagCategory } from "components/tags/TagCategory/actions";
import Modal from 'components/ui/Modal'
import TagCategoryForm from "pages/tags/components/TagCategoryModal/Form";
import { IRootState, ITagCategory } from "types";
import CreateFolderForm from './Form'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  tagCategory?: ITagCategory,
  isOpen: boolean,
  onRequestClose: () => void
}

export default function TagCategoryModal(props: Props){
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    if(props.tagCategory){
      dispatch(updateTagCategory(props.tagCategory.id, data));
    }else{
      dispatch(createTagCategory({...data, tags:[]}));

    }
     console.log('success')
  }

  return (
    <Modal {...props} title={props.tagCategory ? 'Редактирование' : 'Новая коллекция'}>
        <TagCategoryForm onSubmit={handleSubmit} initialValues={{...props.tagCategory}}/>
    </Modal>
  )
}
