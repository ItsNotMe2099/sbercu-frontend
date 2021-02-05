import {
  fetchCatalogList,
  fetchCatalogProjects,
  fetchMyUploadedFiles,
  resetCatalogList
} from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, createFolderOpen, editFileOpen, modalClose } from "components/Modal/actions";
import { fetchCatalogFilesSearch, fetchCatalogProjectsSearch } from "components/search/actions";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import FileEditModal from "components/FileEditModal";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState } from "types";
import { logout, withAuthSync } from "utils/auth";
import { pluralize } from "utils/formatters";
import styles from './index.module.scss'
import { TagSelect } from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import { useDispatch, useSelector } from 'react-redux'
import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import ProjectLoader from "components/ContentLoaders/projectLoader";


const Dashboard = (props) => {
  const user = props.user;
  const dispatch = useDispatch();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)


  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const projectsLoading = useSelector((state: IRootState) => state.catalog.listLoading)
  const filesLoading = useSelector((state: IRootState) => state.catalog.myUploadedFilesListLoading)
  const loading = projectsLoading || filesLoading;


  const projects = useSelector((state: IRootState) => state.catalog.projects)
  const projectsTotal = useSelector((state: IRootState) => state.catalog.projectsTotal)
  const files = useSelector((state: IRootState) => state.catalog.myUploadedFilesList)
  const filesTotal = useSelector((state: IRootState) => state.catalog.myUploadedFilesListTotal)

  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)

  const [showProjects, setShowAllProjects] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)
  const [pageFiles, setPageFiles] = useState(1);
  const [pageProjects, setPageProjects] = useState(1);
  const [tags, setTags] = useState([]);

  const limitFiles = 6;
  const limitProjects = 6;

  useEffect(() => {
    dispatch(resetCatalogList());
    dispatch(fetchTagCategoryList());
    dispatch(fetchCatalogProjects({entryType: 'project', limit: limitProjects}))
    dispatch(fetchMyUploadedFiles(user.id, {limit: limitFiles}));
  }, [])

  const handleTagChangeTags = (tags) => {
    setTags(tags);
    dispatch(fetchCatalogProjects({entryType: 'project', limit: limitProjects, ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}))
  }

  const handleEditClick = useCallback((item) => {
      setCurrentEditCatalog(item);
      dispatch(editFileOpen());

  }, [])
  const handleDeleteClick = (item) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить файл?',
      description: item.name,
      confirmColor: 'red',
      confirmText: 'Удалить',
      onConfirm: () => {
      }
    }));
  }

  const handleShowFiles = () => {
    if(showFiles){
      setShowAllFiles(false)
    }else{
      setShowAllFiles(true)
      if(pageFiles === 1){
        setPageFiles(pageFiles + 1)
        dispatch(fetchMyUploadedFiles( user.id, {  page: pageFiles + 1, limit: limitFiles }));
      }
    }

  }
  const handleScrollNextFiles = () => {
    setPageFiles(pageFiles + 1)
    dispatch(fetchMyUploadedFiles( user.id, { page: pageFiles + 1, limit: limitFiles }));
  }

  const handleShowProjects = () => {
    if(showProjects){
      setShowAllProjects(false)
    }else{
      setShowAllProjects(true)
      if(pageProjects === 1){
        setPageProjects(pageProjects + 1)
        dispatch(fetchCatalogProjects({entryType: 'project', ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageProjects + 1, limit: limitProjects }));
      }
    }

  }
  const handleScrollNextProjects = () => {
    setPageProjects(pageProjects + 1)
    dispatch(fetchCatalogProjects({entryType: 'project', ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageProjects + 1, limit: limitProjects }));
  }

  return (
    <Layout>
    <Header/>

      <div className={styles.root}>

        {!loading && filesTotal === 0 && projectsTotal === 0 &&
        <div className={styles.noFiles}>
          <div className={styles.text}>
            <div className={styles.firstText}>По вашему запросу ничего не найдено.</div>
            <div className={styles.secondText}>Попробуйте написать название материала по-другому или
              сократить запрос
            </div>
          </div>
          <div className={styles.images}>
            <img className={styles.lamp} src="/img/icons/lamp.svg" alt=''/>
          </div>
        </div>}
        {!loading && (filesTotal > 0 && projectsTotal > 0) && <>
          <TagSelect items={tagCategories} onChangeSelectedTags={handleTagChangeTags}/>
        </>}
        {loading && filesTotal === 0 && projectsTotal === 0 && <DashboardLoader/>}
        {projectsTotal > 0 && <>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Проекты</div>
            <Quantity
                quantity={projectsTotal}
            />
          </div>
          <InfiniteScroll
              dataLength={projects.length}
              next={handleScrollNextProjects}
              loader={<div></div>}
              hasMore={showProjects && projectsTotal !== projects.length}
              className={styles.scroll}
          >
            <div className={styles.projects}>
              {(showProjects ? projects : projects.slice(0, 5)).map(item => (<Project
                      item={item}
                  />
              ))}
            </div>
          </InfiniteScroll>
          {projectsTotal > 5 && <div className={styles.more}>
            <a onClick={handleShowProjects}>
              <img className={showProjects ? styles.hide : null} src="img/icons/arrowDown.svg"
                   alt=''/>{showProjects ? <span>Скрыть</span> : <span>Показать еще</span>}
            </a>
          </div>}
        </>}

        {filesTotal > 0 && <>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Файлы загруженные мной</div>
            <Quantity
                quantity={filesTotal}
            />
          </div>
          <div className={styles.files}>
            <InfiniteScroll
                dataLength={files.length}
                next={handleScrollNextFiles}
                loader={<div></div>}
                hasMore={showFiles && filesTotal !== files.length}
                className={styles.scroll}
            >
              {(showFiles ? files : files.slice(0, 5)).map(item => (<File
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  canEdit={false}
                  basePath={''}
                  item={item}
              />))}

            </InfiniteScroll>
          </div>
          {filesTotal > 5 && <div className={styles.moreFiles}>
            <a onClick={handleShowFiles}>
              <img className={showFiles ? styles.hide : null} src="img/icons/arrowDown.svg"
                   alt=''/>{showFiles ? <span>Скрыть</span> : <span>Показать еще</span>}
            </a>
          </div>}
        </>}


      </div>

      <FileEditModal isOpen={key === 'editFile'} catalog={currentEditCatalog} onRequestClose={() => dispatch(modalClose())}/>

      <Footer/>
    </Layout>
  )
}

export default withAuthSync(Dashboard)
