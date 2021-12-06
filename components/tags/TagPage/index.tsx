import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, modalClose, tagCategoryModalOpen, tagModalOpen } from "components/Modal/actions";
import { deleteTag } from "components/tags/Tag/actions";
import {deleteTagCategory, fetchTagCategoryList, setTagCategoryType} from "components/tags/TagCategory/actions";
import Button from "components/ui/Button";
import TagCategoryModal from "components/tags/TagCategoryModal";
import TagModal from "components/tags/TagModal";
import { useEffect, useState } from "react";
import {IRootState, ITag, ITagCategory, ITagCategoryType} from "types";
import {getAuthServerSide, logout} from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import TagCategory from "components/tags/TagCategory";
import { useSelector, useDispatch } from 'react-redux'
import TagsLoader from "components/ContentLoaders/tagsLoader";
interface Props{
categoryType: ITagCategoryType
}
const TagPage = (props: Props) => {
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const items = useSelector((state: IRootState) => state.tagCategory.list)
  const listLoading = useSelector((state: IRootState) => state.tagCategory.listLoading)
  const [currentEditTag, setCurrentEditTag] = useState(null)
  const [currentEditTagCategory, setCurrentEditTagCategory] = useState(null)

  useEffect(() => {
    dispatch(setTagCategoryType(props.categoryType))
    dispatch(fetchTagCategoryList(props.categoryType))
  }, [])

  const handleEditTag = (item: ITag) => {
    setCurrentEditTag(item);
    dispatch(tagModalOpen());
  }
  const handleDeleteTag = (item: ITag) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить тег?',
      description: item.name,
      confirmColor: 'red',
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
      confirmColor: 'red',
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
  const getTitle = () => {
    switch (props.categoryType){

      case ITagCategoryType.Project:
        return 'Теги проектов';
      case ITagCategoryType.Speaker:
        return 'Теги спикеров';
    }
  }

  return (
    <Layout>
    <Header {...props}>
      <div className={styles.tagBtn}><Button transparent visiblePlus textGreen btnGreen type="button" onClick={handleNewTagClick}>Создать новый тег</Button></div>
      <div className={styles.tagBtn}><Button transparent visiblePlus textGreen btnGreen type="button" onClick={handleNewTagCategoryClick}>Создать новую коллекцию</Button></div>
    </Header>
    <div className={styles.root}>
      {items.length === 0 && listLoading ?
      <TagsLoader/>
      :
      <>
      <div className={styles.title}>{getTitle()}</div>
      <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
      <div className={styles.container}>
        {items.map(item => <TagCategory  onEditClick={handleEdit} onDeleteClick={handleDelete} onTagEditClick={handleEditTag} onTagDeleteClick={handleDeleteTag} editMode={true} item={item} selectedTags={[]}/>)}
      </div>
      </>}
    </div>
    <TagModal categoryType={props.categoryType} isOpen={key === 'tag'}
              onRequestClose={() => dispatch(modalClose())} tag={currentEditTag}/>
    <TagCategoryModal categoryType={props.categoryType}  isOpen={key === 'tagCategory'}
              onRequestClose={() => dispatch(modalClose())} tagCategory={currentEditTagCategory}/>
    <Footer/>
    </Layout>
  )
}
export default TagPage
