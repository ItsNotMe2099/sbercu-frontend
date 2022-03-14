
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import {confirmOpen, createFolderOpen, editFileOpen, modalClose} from "components/Modal/actions";
import {
   fetchSpeakersSearch,
  resetCatalogSearch
} from "components/search/actions";
import {fetchTagCategoryList} from "components/tags/TagCategory/actions";
import NoFiles from "components/ui/NoFiles";
import {useRouter} from "next/router";
import FileEditModal from "components/FileEditModal";
import {useCallback, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {IHeaderType, IRootState, ITagCategoryType} from "types";
import {getAuthServerSide, logout} from "utils/auth";
import {pluralize} from "utils/formatters";
import styles from './index.module.scss'
import {TagSelect} from "components/dashboard/TagSelect";
import Header from "components/layout/Header";
import {useDispatch, useSelector} from 'react-redux'
import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import SpeakerCard from 'components/speakers/SpeakerCard'


const Search = (props) => {
  const dispatch = useDispatch();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const router = useRouter()
  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const speakers = useSelector((state: IRootState) => state.search.speakers)
  const speakersLoading = useSelector((state: IRootState) => state.search.listSpeakersLoading)
  const loading = speakersLoading;
  const speakersTotal = useSelector((state: IRootState) => state.search.speakersTotal)

  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)

  const [pageSpeakers, setPageSpeakers] = useState(1);
  const [tags, setTags] = useState([]);
  const [isInit, setIsInit] = useState(false)

  const limitSpeakers = 30;
  const {query} = router.query;
  useEffect(() => {
    if (!query) {
      return;
    }
    dispatch(resetCatalogSearch());
    dispatch(fetchTagCategoryList(ITagCategoryType.Speaker));
    dispatch(fetchSpeakersSearch(query, {limit: limitSpeakers}));
  }, [query])
  useEffect(() => {
    if (speakersTotal > 0) {
      setIsInit(true);
    }
  }, [speakersTotal])

  const handleTagChangeTags = (tags) => {
    setTags(tags);
    setPageSpeakers(1);
    dispatch(resetCatalogSearch());
    dispatch(fetchSpeakersSearch(query, {
      ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {}),
      page: 1,
      limit: limitSpeakers
    }));
  }

  const handleEditClick = useCallback((item) => {
    setCurrentEditCatalog(item);
    dispatch(editFileOpen());

  }, [])

  const handleScrollNextSpeakers = () => {
    setPageSpeakers(pageSpeakers + 1)
    dispatch(fetchSpeakersSearch(query, {
      ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {}),
      page: pageSpeakers + 1,
      limit: limitSpeakers
    }));
  }
  return (
    <Layout>
      <Header {...props} searchValue={query as string} type={IHeaderType.Speaker}/>
      <div className={styles.root}>
        {!loading && speakersTotal === 0 && tags.length === 0 &&
        <NoFiles/>}
        {(speakersTotal > 0) &&
        <div
            className={styles.titleSearch}>{speakersTotal} {pluralize(speakersTotal, 'результат', 'результата', 'результатов')} поиска
            «{query}»
        </div>}
        {isInit && <TagSelect items={tagCategories} selectedTags={tags} onChangeSelectedTags={handleTagChangeTags}/>}

        {loading && speakersTotal === 0 && <DashboardLoader/>}
        {speakersTotal > 0 && <>

            <InfiniteScroll
                dataLength={speakers.length}
                next={handleScrollNextSpeakers}
                loader={<div></div>}
                hasMore={speakersTotal !== speakers.length}
                className={styles.scroll}
            >
                <div className={styles.speakers}>
                  {speakers.map(item => (<SpeakerCard
                      item={item}
                    />
                  ))}
                </div>
            </InfiniteScroll>
        </>}

      </div>

      <Footer/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default Search

