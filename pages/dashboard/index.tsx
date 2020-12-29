import { fetchCatalogList, fetchCatalogProjects, fetchMyUploadedFiles } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, createFolderOpen, editFileOpen, modalClose } from "components/Modal/actions";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import FileEditModal from "pages/catalog/components/FileEditModal";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import { TagSelect } from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import { useDispatch, useSelector } from 'react-redux'
import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import ProjectLoader from "components/ContentLoaders/projectLoader";


export default function Dashboard(props){
  const dispatch = useDispatch();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)


  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const listLoading = useSelector((state: IRootState) => state.catalog.listLoading)
  const myUploadedFilesLoading = useSelector((state: IRootState) => state.catalog.myUploadedFilesListLoading)

  const projects = useSelector((state: IRootState) => state.catalog.projects)
  const myUploadedFiles = useSelector((state: IRootState) => state.catalog.myUploadedFilesList)
  const [show, setShowAll] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)
  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)

  useEffect(() => {
    dispatch(fetchTagCategoryList());
    dispatch(fetchCatalogProjects({entryType: 'project'}))
    dispatch(fetchMyUploadedFiles({}));
  }, [])

  const handleTagChangeTags = (tags) => {
    dispatch(fetchCatalogProjects({entryType: 'project', ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}))
  }
  const items = [
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
  ]

  const handleEditClick = useCallback((item) => {
      setCurrentEditCatalog(item);
      dispatch(editFileOpen());

  }, [])
  const handleDeleteClick = (item) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить файл?',
      description: item.name,
      confirmText: 'Удалить',
      onConfirm: () => {
      }
    }));
  }
  return (
    <Layout>
    <Header/>

    <div className={styles.root}>
      <TagSelect items={tagCategories} onChangeSelectedTags={handleTagChangeTags}/>
      {listLoading ?
          <>
            <DashboardLoader/>
            <ProjectLoader/>
          </>
          :
          <div>
            <a className={styles.noFiles} >
              <div className={styles.text}>
                <div className={styles.firstText}>По вашему запросу ничего не найдено.</div>
                <div className={styles.secondText}>Попробуйте написать название материала по-другому или сократить запрос</div>
                </div>
              <div className={styles.images}>
                <img className={styles.lamp} src="/img/icons/lamp.svg" alt=''/>
              </div>
            </a>
            <div className={styles.titleContainer}>
        <div className={styles.title}>Проекты</div>
        <Quantity
        quantity={projects.length}
        />
      </div>
      <div className={styles.projects}>
      {(show ? projects : projects.slice(0, 5)).map(item => (<Project
          item={item}
          />
          ))}
      </div>
      <div className={styles.projectMobile}>
          {(show ? projects : projects.slice(0, 4)).map(item => (<Project
          item={item}
          />
          ))}
      </div>
      {projects.length > 5 && <div className={styles.more}>
        <a onClick={() => show ? setShowAll(false) : setShowAll(true)}>
          <img className={show ? styles.hide : null} src="img/icons/arrowDown.svg" alt=''/>{show ? <span>Скрыть</span> : <span>Показать еще</span>}
        </a>
      </div>}
      <div className={styles.titleContainer}>
        <div className={styles.title}>Файлы</div>
        <Quantity
        quantity={myUploadedFiles.length}
        />
      </div>
      <div className={styles.files}>


        {(showFiles ? myUploadedFiles : myUploadedFiles.slice(0, 5)).map(item => (<File
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            basePath={''}
            item={item}
        />))}
      </div>
      {myUploadedFiles.length > 5 && <div className={styles.moreFiles}>
        <a onClick={() => showFiles ? setShowAllFiles(false) : setShowAllFiles(true)}>
          <img className={showFiles ? styles.hide : null} src="img/icons/arrowDown.svg" alt=''/>{showFiles ? <span>Скрыть</span> : <span>Показать еще</span>}
        </a>
      </div>}
      </div>}
    </div>

      <FileEditModal isOpen={key === 'editFile'} catalog={currentEditCatalog} onRequestClose={() => dispatch(modalClose())}/>

      <Footer/>
    </Layout>
  )
}

