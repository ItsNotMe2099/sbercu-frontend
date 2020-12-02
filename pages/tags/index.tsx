import { confirmOpen, modalClose, tagCategoryModalOpen, tagModalOpen } from "components/Modal/actions";
import { deleteTag } from "components/tags/Tag/actions";
import { deleteTagCategory, fetchTagCategoryList } from "components/tags/TagCategory/actions";
import Button from "components/ui/Button";
import TagCategoryModal from "pages/tags/components/TagCategoryModal";
import TagModal from "pages/tags/components/TagModal";
import { useEffect, useState } from "react";
import { IRootState, ITag, ITagCategory } from "types";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import TagCategory from "components/tags/TagCategory";
import { useSelector, useDispatch } from 'react-redux'

const Tags = (props) => {
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const items = useSelector((state: IRootState) => state.tagCategory.list)
  const [currentEditTag, setCurrentEditTag] = useState(null)
  const [currentEditTagCategory, setCurrentEditTagCategory] = useState(null)

  useEffect(() => {
    dispatch(fetchTagCategoryList())
  }, [])

  const handleEditTag = (item: ITag) => {
    setCurrentEditTag(item);
    dispatch(tagModalOpen());
  }
  const handleDeleteTag = (item: ITag) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить тег?',
      description: item.name,
      confirmText: 'Удалить',
      onConfirm: () => {
        dispatch(deleteTag(item.id));
      }
    }));
  }

  const handleEdit = (item: ITag) => {
    console.log("handleEdit", item)
    setCurrentEditTagCategory(item);
    dispatch(tagCategoryModalOpen());
  }
  const handleDelete = (item: ITagCategory) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить коллекцию?',
      description: item.name,
      confirmText: 'Удалить',
      onConfirm: () => {
        dispatch(deleteTagCategory(item.id));
      }
    }));
  }
  const handleNewTagClick = () => {
    setCurrentEditTag(null);
    dispatch(tagModalOpen())
  }
  const handleNewTagCategoryClick = () => {
    setCurrentEditTagCategory(null);
    dispatch(tagCategoryModalOpen())
  }

  return (
    <>
    <Header tagsPage>
      <div className={styles.tagBtn}><Button transparent visiblePlus textGreen btnGreen type="button" onClick={handleNewTagClick}>Создать новый тег</Button></div>
      <div className={styles.tagBtn}><Button transparent visiblePlus textGreen btnGreen type="button" onClick={handleNewTagCategoryClick}>Создать новую коллекцию</Button></div>
    </Header>
    <div className={styles.root}>
      <div className={styles.title}>Теги</div>
      <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
      <div className={styles.container}>
        {items.map(item => <TagCategory  onEditClick={handleEdit} onDeleteClick={handleDelete} onTagEditClick={handleEditTag} onTagDeleteClick={handleDeleteTag} editMode={true} item={item} selectedTags={[]}/>)}
      </div>
    </div>
    <TagModal isOpen={key === 'tag'}
              onRequestClose={() => dispatch(modalClose())} tag={currentEditTag}/>
    <TagCategoryModal isOpen={key === 'tagCategory'}
              onRequestClose={() => dispatch(modalClose())} tagCategory={currentEditTagCategory}/>
    </>
  )
}

export default withAuthSync(Tags)
