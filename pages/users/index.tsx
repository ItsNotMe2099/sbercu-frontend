import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, modalClose, tagModalOpen, userModalOpen } from "components/Modal/actions";
import { deleteTag } from "components/tags/Tag/actions";
import { fetchTagCategoryListByName } from "components/tags/TagCategory/actions";
import Button from "components/ui/Button";
import { deleteUser, fetchUserList } from "components/users/actions";
import TagCategoryModal from "pages/tags/components/TagCategoryModal";
import UserListRow from "pages/users/components/UserListRow";
import UserModal from "pages/users/components/UserModal";
import { useEffect, useState } from "react";
import { IRootState, ITag, IUser } from "types";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import TagCategory from "components/tags/TagCategory";
import InputSearch from "components/ui/Inputs/InputSearch";
import { useSelector, useDispatch } from 'react-redux'
import UsersLoader from "components/ContentLoaders/usersLoader";


export default function Users(props){
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const users = useSelector((state: IRootState) => state.users.list)
  const tagCategory = useSelector((state: IRootState) => state.tagCategory.list)
  const [currentEditUser, setCurrentEditUser] = useState(null)
  const [filter, setFilter] = useState('' )
  const [selectedTags, setSelectedTags] = useState([])
  const handleTagClick = (selectedItem, selected) => {
    console.log("HandleTagClick", selectedItem, selected)
    if(selected) {
      setSelectedTags(tags => [...tags, selectedItem])
    }else{
      setSelectedTags(tags => tags.filter(item => item.id !== selectedItem.id))
    }
  }
  useEffect(() => {
    dispatch(fetchUserList());
    dispatch(fetchTagCategoryListByName('Подразделения'));
  }, [])

  const handleEditUser = (item: ITag) => {
    setCurrentEditUser(item);
    dispatch(userModalOpen());
  }
  const handleDeleteUser = (item: IUser) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить пользователя?',
      description: `${item.lastName} ${item.firstName}`,
      confirmText: 'Удалить',
      onConfirm: () => {
        dispatch(deleteUser(item.id));
      }
    }));
  }
  const handleNewUserClick = () => {
    setCurrentEditUser(null);
    dispatch(userModalOpen())
  }


  return (
    <Layout>
    <Header>
      <div className={styles.tagBtn}><Button transparent invite textGreen btnGreen type="button" onClick={handleNewUserClick}>Пригласить</Button></div>
    </Header>
    <div className={styles.root}>
      {users.length === 0 ?
      <UsersLoader/>
      :
      <>
      <div className={styles.title}>Пользователи</div>
      <div className={styles.container}>
        {tagCategory.slice(0, 1).map(item => <TagCategory hideHeader={true}  green item={item} onTagClick={handleTagClick} selectedTags={selectedTags}/>)}
      </div>
      <div className={styles.inputContainer}>
        <InputSearch placeholder="Введите ФИО, логин или почту пользователя" onChange={value => {console.log("VALUE", value);setFilter(value)}}/>
      </div>
      <div className={styles.table}>
        <div className={styles.tr}>
          <div className={styles.td}>ФИО</div>
          <div className={styles.td}>Статус</div>
          <div className={styles.td}>Логин ВШ</div>
          <div className={styles.td}>Почта</div>
          <div className={styles.td}>Подразделение</div>
        </div>
        {users.filter(user => (selectedTags.length === 0 || !!selectedTags.find(tag => tag.id === user.departmentTags[0]?.id)) ).filter(user => !filter || (user.firstName.indexOf(filter) > -1 || user.lastName.indexOf(filter) > -1 || user.email.indexOf(filter) > -1) ).map(user => <UserListRow user={user} onDeleteClick={handleDeleteUser} onEditClick={handleEditUser}/>)}

    </div>
    </>
    }
    </div>
    <UserModal isOpen={key === 'userForm'}
                      onRequestClose={() => dispatch(modalClose())} user={currentEditUser}/>
    <Footer/>
    </Layout>
  )
}

