import {
  fetchCatalogProjects,
  fetchMyUploadedFiles,
  resetCatalogList,
  resetMyUploadedFiles
} from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import {confirmOpen, editFileOpen, modalClose} from "components/Modal/actions";
import {fetchTagCategoryList} from "components/tags/TagCategory/actions";
import FileEditModal from "components/FileEditModal";
import NoFiles from "components/ui/NoFiles";
import {useCallback, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {IRootState, ITagCategoryType} from "types";
import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import {TagSelect} from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File, {FileShowType} from "components/dashboard/File";
import Header from "components/layout/Header";
import {useDispatch, useSelector} from 'react-redux'
import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import {useRouter} from "next/router";
import * as React from 'react'
import {fetchSpeakerList, resetSpeakerList} from 'components/speakers/actions'
import SpeakerCard from 'components/speakers/SpeakerCard'
import Link from 'next/link'

const queryString = require('query-string')

const Dashboard = (props) => {
  const user = props.user;
  const dispatch = useDispatch();
  const router = useRouter();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)


  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const projectsLoading = useSelector((state: IRootState) => state.catalog.listLoading)
  const filesLoading = useSelector((state: IRootState) => state.catalog.myUploadedFilesListLoading)
  const speakersLoading = useSelector((state: IRootState) => state.speakers.listLoading)
  const loading = projectsLoading || filesLoading || speakersLoading;


  const projects = useSelector((state: IRootState) => state.catalog.projects)
  const projectsTotal = useSelector((state: IRootState) => state.catalog.projectsTotal)
  const files = useSelector((state: IRootState) => state.catalog.myUploadedFilesList)
  const filesTotal = useSelector((state: IRootState) => state.catalog.myUploadedFilesListTotal)

  const speakers = useSelector((state: IRootState) => state.speakers.list)
  const speakersTotal = useSelector((state: IRootState) => state.speakers.listTotal)

  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)

  const [showProjects, setShowAllProjects] = useState(false)
  const [showSpeakers, setShowAllSpeakers] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)
  const [pageFiles, setPageFiles] = useState(1);
  const [pageProjects, setPageProjects] = useState(1);
  const [pageSpeakers, setPageSpeakers] = useState(1);
  let tagsFromQuery = [];
  try{
    tagsFromQuery = (router.query as any).tags ? JSON.parse((router.query as any).tags) : [];
  }catch (e){

  }
  const [tags, setTags] = useState([]);
  const [isInit, setIsInit] = useState(false)

  const limitFiles = 30;
  const limitProjects = 30;
  const limitSpeakers = 30;

  useEffect(() => {
    dispatch(resetCatalogList());
    dispatch(resetMyUploadedFiles());
    dispatch(fetchTagCategoryList(ITagCategoryType.Project));
    dispatch(fetchCatalogProjects({entryType: 'project', limit: limitProjects}))
    dispatch(fetchMyUploadedFiles(user.id, {limit: limitFiles}));
    if(user.role !== 'guest') {
      dispatch(fetchSpeakerList({limit: limitSpeakers}))
    }
    return () => {
      dispatch(resetCatalogList());
      dispatch(resetSpeakerList());
    }
  }, [])

  useEffect(() => {
    if(projectsTotal > 0){
      setIsInit(true);
    }
  }, [projectsTotal])

  const handleTagChangeTags = (tags) => {
    setTags(tags);
    dispatch(resetCatalogList());
    dispatch(fetchCatalogProjects({page: 1, entryType: 'project', limit: limitProjects, ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}))
    router.replace(`/?${queryString.stringify({tags: JSON.stringify(tags.map(tag => tag.id))})}`, undefined, { shallow: true })

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
  const handleShowSpeakers = () => {
    if(showSpeakers){
      setShowAllSpeakers(false)
    }else{
      setShowAllSpeakers(true)
      if(pageSpeakers === 1){
        setPageSpeakers(pageSpeakers + 1)
        dispatch(fetchSpeakerList({ page: pageSpeakers + 1, limit: limitSpeakers }));
      }
    }
  }
  const handleScrollNextProjects = () => {
    setPageProjects(pageProjects + 1)
    dispatch(fetchCatalogProjects({entryType: 'project', ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageProjects + 1, limit: limitProjects }));
  }
  const handleScrollNextSpeakers = () => {
    setPageSpeakers(pageSpeakers + 1)
    dispatch(fetchSpeakerList({ page: pageSpeakers + 1, limit: limitSpeakers }));
  }

  return (
    <Layout>
    <Header {...props}/>

      <div className={styles.root}>


        {(isInit && tagCategories.length > 0) && <TagSelect items={tagCategories} selectedTags={tags} initialTags={tagsFromQuery} onChangeSelectedTags={handleTagChangeTags}/>}
        {loading && filesTotal === 0  && projectsTotal === 0 && speakersTotal === 0 && <DashboardLoader/>}
        {!loading && projectsTotal === 0 &&
        <NoFiles/>}
        {projectsTotal > 0 && <>
            <div className={styles.titleContainer} data-tour={'projects'}>
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
                style={{overflow: "inherit"}}
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



        {(speakersTotal > 0 && user.role !== 'guest') && <>
            <div className={styles.titleContainer}>
                <div className={styles.titleWrapper}>
                <div className={styles.title}>Спикеры</div>
                <Quantity
                    quantity={speakersTotal}
                />
                </div>
                <Link href={'/speakers'}><a className={styles.speakersAllLink}>Перейти в раздел</a></Link>
            </div>
            <InfiniteScroll
                dataLength={speakers.length}
                next={handleScrollNextSpeakers}
                loader={<div></div>}
                hasMore={showSpeakers && speakersTotal !== speakers.length}
                style={{overflow: "inherit"}}
                className={styles.scroll}
            >
                <div className={styles.speakers}>
                  {(showSpeakers ? speakers : speakers.slice(0, 5)).map(item =>  (<SpeakerCard item={item} />))}
                </div>
            </InfiniteScroll>
          {speakersTotal > 5 && <div className={styles.more}>
              <a onClick={handleShowSpeakers}>
                  <img className={showSpeakers ? styles.hide : null} src="img/icons/arrowDown.svg"
                       alt=''/>{showSpeakers ? <span>Скрыть</span> : <span>Показать еще</span>}
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
                style={{overflow: "inherit"}}
                hasMore={showFiles && filesTotal !== files.length}
                className={styles.scroll}
            >
              {(showFiles ? files : files.slice(0, 5)).map(item => (<File
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  showType={FileShowType.MyFiles}
                  canEdit={true}
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
export const getServerSideProps = getAuthServerSide({redirect: true});
export default Dashboard
