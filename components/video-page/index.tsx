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
import VideoConverting from "components/video-page/component/VideoConverting";
import React, {useEffect} from "react";
import {ICatalogEntry, IRootState} from "types";
import {capitalizeFirstLetter, formatSize} from "utils/formatters";
import {getMediaPath, getMediaPathWithQuality} from "utils/media";
import styles from 'components/video-page/index.module.scss'
import Header from "components/layout/Header";
import BreadCrumbs from 'components/ui/Breadcrumbs';
import Tag from 'components/video-page/component/tag';
import ButtonSelect from 'components/ui/ButtonSelect';
import Button from 'components/ui/Button';
import Info from 'components/video-page/component/info';
import Player from 'components/video/Player';
import {useDispatch, useSelector} from 'react-redux'

import {format} from 'date-fns'
import MediaLinkTempModal from "components/MediaLinkTempModal";
import MediaLinkVirtSchoolModal from "components/MediaLinkVirtSchoolModal";
import MediaLinkPublicModal from "components/MediaLinkPublicModal";
import {Head} from 'next/document'
import {NextSeo} from 'next-seo'
import {createVideoViewHistory, getVideoViewHistory} from 'utils/requests'
import { IUser } from "types";
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import useInterval from 'react-useinterval'
import {fetchJobListByIds} from 'components/jobs/actions'
const queryString = require('query-string')

interface Props {
  initialVideo: ICatalogEntry,
  user: IUser
}


const VideoPage = (props: Props) => {

  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const video = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const settings = [
    {value: 'edit', label: 'Редактировать'},
    {value: 'poster', label: 'Загрузить постер'},
    ...(video?.media?.type === 'video' ? [{value: 'videoEditor', label: 'Редактировать видео'}] : []),
    {value: 'copy', label: 'Вырезать'},
    {value: 'delete', label: 'Удалить'}
  ];

  const links = [
  ...(video?.canEdit ? [
    {value: 'virtualSchool', label: 'ВШ ID'},
    {value: 'temp', label: 'Временная'},
  ] : []),
    {value: 'public', label: 'Публичная'},

  ];
  const dispatch = useDispatch();
  const router = useRouter()
  console.log("Auth", props)

  useInterval(() => {
    const isConverting =  video?.media?.videoCutting || ['pending', 'started'].includes(video?.media?.lastJob?.state)
    if(isConverting){
      dispatch(fetchCatalogItemRequest(router.query.id, {showTags: '1'}, true));
    }

  }, 3000);

  useEffect( () => {
    dispatch(resetCatalogItem());
    if (!router.query.id) {
      return;
    }

    dispatch(fetchCatalogItemRequest(router.query.id, {showTags: '1'}));
    return () => {
      dispatch(resetCatalogItem());
    }

  }, [])

  const getDefaultSource = () => {
    const path = video.media?.fileName;

    const qualityItem = video.media?.videoElements?.find(el => el.quality === '1080p') || video.media?.videoElements[video.media?.videoElements?.length - 1];
    const quality = qualityItem?.quality;
    return qualityItem && quality ? `${getMediaPathWithQuality(path, quality)}&duration=${qualityItem.duration}` : getMediaPath(path)

  }
  const handleDownload = (item) => {
    window.location.href = item.value;
  }
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
  const handleSettingsClick = (item) => {
    switch (item.value) {
      case 'share':
        break;
      case 'poster':
        dispatch(filePosterUploadModalOpen())
        break;
      case 'edit':
        dispatch(editFileOpen());
        break;
      case 'copy':
        dispatch(catalogCopy(video));
        break;
      case 'videoEditor':
        router.push(`/video/${video?.id}/editor`)
        break;
      case 'delete':
        dispatch(confirmOpen({
          title: 'Вы уверены, что хотите удалить файл?',
          description: item.name,
          confirmColor: 'red',
          confirmText: 'Удалить',
          onConfirm: () => {
            dispatch(deleteCatalog(video?.id));
          }
        }));
        break;
    }
  }

  const handleLinksClick = (item) => {
    switch (item.value) {
      case 'virtualSchool':
        dispatch(mediaLinkVirtSchoolModalOpen());
        break;
      case 'public':
        dispatch(mediaLinkPublicModalOpen());
        break;
      case 'temp':
        dispatch(mediaLinkTempModalOpen());
        break;
    }
  }
  const handleTagClick = (tag) => {
    console.log("TagClick", tag);
    router.push(`/?${queryString.stringify({tags: JSON.stringify([tag.id])})}`)
  }
  const isAudio = video?.media?.type === 'audio';
  const handleProgressChange = async (data) => {
    await createVideoViewHistory({
      mediaId: video?.media?.id,
      currentTime: data.currentTime,
      muted: data.muted,
      volume: data.volume,
      rate: data.rate,
    })
  }
  const loadVideoViewHistory = async () => {
    const  viewHistoryRes = await getVideoViewHistory(video?.mediaId);
    return viewHistoryRes?.data;
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
                {video.media?.type === 'video' && (!video.media || !video.media?.videoConverted || video.media?.videoCutting) ?
                  <>
                    <VideoConverting isCutting={video.media?.videoCutting} item={video}/>
                    <div className={styles.btns}>
                      <div className={styles.select}><ButtonSelect onChange={handleSettingsClick}
                                                                   options={[{value: 'edit', label: 'Редактировать'}]}
                                                                   size="9px 20px">Настройки</ButtonSelect></div>
                    </div>
                  </>
                  :
                  <>
                    <Player
                      isAudio={isAudio}
                      poster={getMediaPath(video.poster)}
                      sources={video.media?.videoElements?.map(el => ({
                        label: el.quality,
                        value: `${getMediaPathWithQuality(video.media.fileName, el.quality)}&duration=${el.duration}`
                      })) || []}
                      getViewHistory={loadVideoViewHistory}
                      onChangeProgress={handleProgressChange}
                      source={getDefaultSource()}/>
                    <div className={styles.btns}>
                      <div className={styles.favorite}>
                        <FavoriteCatalogButton item={video} style={'video'}/>
                      </div>
                      <div className={styles.select__down}>
                        <ButtonSelect href={isAudio ? `${getDefaultSource()}?download=1` : null} size="9px 20px"
                                      minWidth="120px" onChange={handleDownload}
                                      options={video.media?.videoElements?.map(el => ({
                                        label: `${el.quality}`,
                                        tip: formatSize(el.size),
                                        value: `${getMediaPathWithQuality(video.media.fileName, el.quality)}&download=1`
                                      })) || []}>Скачать</ButtonSelect></div>
                      {(video?.canEdit || ['admin', 'manager'].includes(props.user?.role)) &&
                      <div className={styles.select}><ButtonSelect onChange={handleLinksClick} options={links}
                                                                   size="9px 20px">Ссылки</ButtonSelect></div>}
                      {video?.canEdit &&
                      <div className={styles.select}><ButtonSelect onChange={handleSettingsClick} options={settings}
                                                                   size="9px 20px">Настройки</ButtonSelect></div>}
                    </div>
                  </>}
                  <Info totalViews={video.media?.totalViews} authors={video.presenters}
                        date={video.createdAt ? format(new Date(video.createdAt), 'dd.MM.yyy') : ''}
                        language="Русский, Английский"/>
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

export default VideoPage
