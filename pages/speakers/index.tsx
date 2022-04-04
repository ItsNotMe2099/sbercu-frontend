import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import {useRouter} from 'next/router'
import {IHeaderType, IRootState, ITagCategoryType} from 'types'
import {useCallback, useEffect, useState} from 'react'
import {
  fetchCatalogProjects,
  fetchMyUploadedFiles,
  resetCatalogList,
  resetMyUploadedFiles
} from 'components/catalog/actions'
import {fetchTagCategoryList} from 'components/tags/TagCategory/actions'
import {confirmOpen, editFileOpen, modalClose} from 'components/Modal/actions'
import Layout from 'components/layout/Layout'
import Header from 'components/layout/Header'
import {TagSelect} from 'components/dashboard/TagSelect'
import DashboardLoader from 'components/ContentLoaders/dashboardLoader'
import NoFiles from 'components/ui/NoFiles'
import InfiniteScroll from 'react-infinite-scroll-component'
import Footer from 'components/layout/Footer'

const queryString = require('query-string')

import {useDispatch, useSelector} from 'react-redux'
import {fetchSpeakerList, resetSpeakerList} from 'components/speakers/actions'
import SpeakerCard from 'components/speakers/SpeakerCard'
import request from 'utils/request'
const Home = (props) => {
  const user = props.user;
  const dispatch = useDispatch();
  const router = useRouter();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)


  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const listLoading = useSelector((state: IRootState) => state.speakers.listLoading)
  const loading = listLoading;


  const list = useSelector((state: IRootState) => state.speakers.list)
  const listTotal = useSelector((state: IRootState) => state.speakers.listTotal)


  const [pageSpeakers, setPageSpeakers] = useState(1);
  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)

  const [showSpeakers, setShowAllSpeakers] = useState(false)

  let tagsFromQuery = [];
  try{
    tagsFromQuery = (router.query as any).tags ? JSON.parse((router.query as any).tags) : [];
  }catch (e){

  }
  const [tags, setTags] = useState([]);
  const [isInit, setIsInit] = useState(false)

  const limit = 30;

  useEffect(() => {
    dispatch(resetSpeakerList());
    dispatch(fetchTagCategoryList(ITagCategoryType.Speaker));
    dispatch(fetchSpeakerList({limit}))
    return () => {
      dispatch(resetSpeakerList());
    }
  }, [])

  useEffect(() => {
    if(listTotal > 0){
      setIsInit(true);
    }
  }, [listTotal])

  const handleTagChangeTags = (tags) => {
    setTags(tags);
    dispatch(resetSpeakerList());
    dispatch(fetchSpeakerList({page: 1,  limit, ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}))
    router.replace(`/speakers?${queryString.stringify({tags: JSON.stringify(tags.map(tag => tag.id))})}`, undefined, { shallow: true })

  }


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



  const handleShowSpeakers = () => {
    if(showSpeakers){
      setShowAllSpeakers(false)
    }else{
      setShowAllSpeakers(true)
      if(pageSpeakers === 1){
        setPageSpeakers(pageSpeakers + 1)
        dispatch(fetchSpeakerList({entryType: 'project', ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageSpeakers + 1, limit }));
      }
    }

  }
  const handleScrollNextProjects = () => {
    setPageSpeakers(pageSpeakers + 1)
    dispatch(fetchSpeakerList({ ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageSpeakers + 1, limit }));
  }

  return (
    <Layout>
      <Header {...props} type={IHeaderType.Speaker}/>

      <div className={styles.root}>


        {(isInit && tagCategories.length > 0) && <TagSelect items={tagCategories} selectedTags={tags} initialTags={tagsFromQuery} onChangeSelectedTags={handleTagChangeTags}/>}
        {loading && listTotal === 0 && <DashboardLoader/>}
        {!loading && listTotal === 0 &&
        <NoFiles/>}
        {listTotal > 0 && <>
            <InfiniteScroll
                dataLength={list.length}
                next={handleScrollNextProjects}
                loader={<div></div>}
                hasMore={showSpeakers && listTotal !== list.length}
                style={{overflow: "inherit"}}
                className={styles.scroll}
            >
                <div className={styles.projects}>
                  {list.map(item => (<SpeakerCard item={item} />))}
                </div>
            </InfiniteScroll>

        </>}




      </div>

      <Footer/>
    </Layout>
  )

}

export async function getServerSideProps(ctx) {
  const authRes = (await getAuthServerSide({redirect: true})(ctx)) as any
  if (!authRes?.props?.user) {
    return authRes;
  }

  if(authRes?.props?.user === 'guest'){
    return {
      notFound: true
    }
  }

  return {
    props: {...authRes?.props},
  }

}

export default Home
