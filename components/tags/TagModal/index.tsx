import { createCatalog } from "components/catalog/actions";
import { createTag, updateTag } from "components/tags/Tag/actions";
import { createTagCategory, updateTagCategory } from "components/tags/TagCategory/actions";
import Modal from 'components/ui/Modal'
import TagForm from "components/tags/TagModal/Form";
import {IRootState, ITag, ITagCategory, ITagCategoryType} from "types";
import CreateFolderForm from 'components/tags/TagModal/Form'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  tag?: ITag,
  isOpen: boolean,
  onRequestClose: () => void
  categoryType: ITagCategoryType
}

export default function TagModal(props: Props){
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    if(props.tag){
      dispatch(updateTag(props.tag.id, data));
    }else{
      dispatch(createTag({name: data.name, tagCategoryId: data.tagCategoryId,  categoryType: props.categoryType}));
    }
     console.log('success')
  }

  return (
    <Modal {...props} title={props.tag ? 'Редактирование' : 'Новые тег'}>
        <TagForm categoryType={props.categoryType} onSubmit={handleSubmit} initialValues={{...props.tag}}/>
    </Modal>
  )
}
