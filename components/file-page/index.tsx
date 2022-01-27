import {
  catalogCopy,
  deleteCatalog,
  fetchCatalogItemRequest,
  resetCatalogItem,
  setCatalogItem
} from "components/catalog/actions";
import FileEditModal from "components/FileEditModal";
import FilePosterModal from "components/FilePosterModal";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import {
  confirmOpen,
  editFileOpen,
  filePosterUploadModalOpen,
  modalClose,
  videoCodeModalOpen, mediaLinkTempModalOpen, mediaLinkPublicModalOpen, mediaLinkVirtSchoolModalOpen
} from "components/Modal/actions";
import VideoCodeModal from "components/VideoCodeModal";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {ICatalogEntry, IRootState} from "types";
import {capitalizeFirstLetter, formatSize} from "utils/formatters";
import {getMediaPath, getMediaPathWithQuality} from "utils/media";
import styles from 'components/file-page/index.module.scss'
import Header from "components/layout/Header";
import BreadCrumbs from 'components/ui/Breadcrumbs';
import Tag from 'components/video-page/component/tag';
import ButtonSelect from 'components/ui/ButtonSelect';
import Button from 'components/ui/Button';
import Info from 'components/file-page/component/info';
import Player from 'components/video/Player';
import {useDispatch, useSelector} from 'react-redux'

import {format} from 'date-fns'
import MediaLinkTempModal from "components/MediaLinkTempModal";
import MediaLinkVirtSchoolModal from "components/MediaLinkVirtSchoolModal";
import MediaLinkPublicModal from "components/MediaLinkPublicModal";
import {Head} from 'next/document'
import {NextSeo} from 'next-seo'
import {createVideoViewHistory, getVideoViewHistory} from 'utils/requests'
import {IUser} from "types";
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import useInterval from 'react-useinterval'
import {fetchJobListByIds} from 'components/jobs/actions'
import DocumentViewer from 'components/file-page/component/DocumentPageViewer'
import FileBottomToolbar from 'components/file-page/component/FileBottomToolbar'
import DocumentPageViewer from 'components/file-page/component/DocumentPageViewer'
import VideoPageViewer from 'components/file-page/component/VideoPageViewer'
import ImagePageViewer from 'components/file-page/component/ImagePageViewer'

const queryString = require('query-string')

interface Props {
  initialVideo: ICatalogEntry,
  user: IUser
}


const FilePage = (props: Props) => {
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const video = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)

  const dispatch = useDispatch();
  const router = useRouter()
  console.log("Auth", props)

  useInterval(() => {
    const isConverting = video?.media?.videoCutting || ['pending', 'started'].includes(video?.media?.lastJob?.state)
    if (isConverting) {
      dispatch(fetchCatalogItemRequest(router.query.id, {showTags: '1'}, true));
    }

  }, 3000);

  useEffect(() => {
    dispatch(resetCatalogItem());
    if (!router.query.id) {
      return;
    }

    dispatch(fetchCatalogItemRequest(router.query.id, {showTags: '1'}));
    return () => {
      dispatch(resetCatalogItem());
    }

  }, [])



  const getTagCategories = () => {
    const categoriesMap = {};
    const categories = []
    console.log("video?.tags", video?.tags)
    for (const tag of video?.tags) {
      if (!tag.tagCategory) {
        continue;
      }
      if (!categoriesMap[tag.tagCategoryId]) {
        categoriesMap[tag.tagCategoryId] = {category: tag.tagCategory, tags: [tag]}
        categories.push(categoriesMap[tag.tagCategoryId]);
      } else {
        categoriesMap[tag.tagCategoryId].tags.push(tag);
      }
    }
    console.log("categories", categories)
    return categories;
  }

  const handleTagClick = (tag) => {
    console.log("TagClick", tag);
    router.push(`/?${queryString.stringify({tags: JSON.stringify([tag.id])})}`)
  }

  const renderFilePreview = () => {
    const isVideo = video?.media?.type === 'video';
    const isAudio = video?.media?.type === 'audio';
    const isDocument = video?.media?.type === 'audio';
    const ext = video?.media?.filePath?.split('.')?.pop()?.toLowerCase() || '';

    if(isVideo || isAudio){
      return <VideoPageViewer item={video}/>
    }else if(['ppt', 'pptx', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'rtf'].includes(ext)){
      return  <DocumentPageViewer item={video}/>
    }else if(['png', 'jpg', 'jpeg', 'gif'].includes(ext)){
      return <ImagePageViewer item={video}/>;
    }
  }
  return (
    <Layout>
      {video && <NextSeo title={video.name}/>}
      <Header {...props}/>
      {(!currentLoading && video) && <div className={styles.root}>
          <div className={styles.title}>{video.name}</div>
          <BreadCrumbs items={[{name: 'Главная', link: '/'}, ...(video?.parents ? video?.parents : [])]}/>
          <div className={styles.content}>
              <div className={styles.videoWrapper}>
                {renderFilePreview()}
                   <FileBottomToolbar item={video} user={props.user}/>

              </div>
              <div className={styles.tags}>
                {getTagCategories().map(category => <Tag
                  onClick={handleTagClick}
                  category={category.category.name}
                  tags={category.tags}
                />)}
              </div>
          </div>
          <div className={styles.tags__mobile}>
            {getTagCategories().map(category => <Tag onClick={handleTagClick}
                                                     category={category.category.name}
                                                     tags={category.tags}
            />)}
          </div>
      </div>}
      <FileEditModal isOpen={modalKey === 'editFile'} catalog={video} onRequestClose={() => dispatch(modalClose())}/>
      {video?.media &&
      <VideoCodeModal isOpen={modalKey === 'videoCode'} video={video} onRequestClose={() => dispatch(modalClose())}/>}
      {video?.media &&
      <FilePosterModal isOpen={modalKey === 'filePoster'} file={video} onRequestClose={() => dispatch(modalClose())}/>}
      {(video?.media && modalKey === 'mediaLinkTemp') &&
      <MediaLinkTempModal isOpen={true} file={video} onRequestClose={() => dispatch(modalClose())}/>}
      {(video?.media && modalKey === 'mediaLinkPublic') &&
      <MediaLinkPublicModal isOpen={true} file={video} onRequestClose={() => dispatch(modalClose())}/>}
      {(video?.media && modalKey === 'mediaLinkVirtSchool') &&
      <MediaLinkVirtSchoolModal isOpen={true} file={video} onRequestClose={() => dispatch(modalClose())}/>}

    </Layout>
  )
}

export default FilePage
