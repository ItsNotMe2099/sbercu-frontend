import { createCatalog } from "components/catalog/actions";
import { createTag, updateTag } from "components/tags/Tag/actions";
import { createTagCategory, updateTagCategory } from "components/tags/TagCategory/actions";
import Modal from 'components/ui/Modal'
import { createUser, updateUser } from "components/users/actions";
import TagForm from "pages/tags/components/TagModal/Form";
import UserForm from "pages/users/components/UserModal/Form";
import { IRootState, ITag, ITagCategory, IUser } from "types";
import CreateFolderForm from './Form'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  user?: IUser,
  isOpen: boolean,
  onRequestClose: () => void
}

export default function UserModal(props: Props){
  const dispatch = useDispatch()
  const handleSubmit = (data) => {
    if(props.user){
      dispatch(updateUser(props.user.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        departmentTagIds: data.departmentTagId ? [data.departmentTagId] : []
      }));
    }else{
      dispatch(createUser({...data, departmentTagId: undefined, departmentTagIds: data.departmentTagId ? [data.departmentTagId] : []}));
    }
     console.log('success')
  }

  return (
    <Modal {...props} title={props.user ? 'Редактирование' : 'Пригласить пользователя'}>
        <UserForm onSubmit={handleSubmit} initialValues={{...props.user, ...(props.user?.departmentTags?.length > 0 ? {
          departmentTagId: props.user?.departmentTags[0].id
        } : {}
        )
        }}/>
    </Modal>
  )
}
