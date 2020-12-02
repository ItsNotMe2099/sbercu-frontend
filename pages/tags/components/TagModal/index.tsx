import { createCatalog } from "components/catalog/actions";
import { createTag, updateTag } from "components/tags/Tag/actions";
import { createTagCategory, updateTagCategory } from "components/tags/TagCategory/actions";
import Modal from 'components/ui/Modal'
import TagForm from "pages/tags/components/TagModal/Form";
import { IRootState, ITag, ITagCategory } from "types";
import CreateFolderForm from './Form'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  tag?: ITag,
  isOpen: boolean,
  onRequestClose: () => void
}

export default function TagModal(props: Props){
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    if(props.tag){
      dispatch(updateTag(props.tag.id, data));
    }else{
      dispatch(createTag({name: data.name, tagCategoryId: data.tagCategoryId}));
    }
     console.log('success')
  }

  return (
    <Modal {...props} title={props.tag ? 'Редактирование' : 'Новые тег'}>
        <TagForm onSubmit={handleSubmit} initialValues={{...props.tag}}/>
    </Modal>
  )
}
