import { catalogCopy, deleteCatalog, fetchCatalogItem, resetCatalogItem } from "components/catalog/actions";
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
import { useRouter } from "next/router";
import VideoConverting from "components/video-page/component/VideoConverting";
import { useEffect } from "react";
import { IRootState } from "types";
import { withAuthSync } from "utils/auth";
import {capitalizeFirstLetter, formatSize} from "utils/formatters";
import { getMediaPath, getMediaPathWithQuality } from "utils/media";
import styles from 'components/video-page/index.module.scss'
import Header from "components/layout/Header";
import BreadCrumbs from 'components/ui/Breadcrumbs';
import Tag from 'components/video-page/component/tag';
import ButtonSelect from 'components/ui/ButtonSelect';
import Button from 'components/ui/Button';
import Info from 'components/video-page/component/info';
import Player from 'components/video/Player';
import { useDispatch, useSelector } from 'react-redux'

import {format} from 'date-fns'
import MediaLinkTempModal from "components/MediaLinkTempModal";
import MediaLinkVirtSchoolModal from "components/MediaLinkVirtSchoolModal";
import MediaLinkPublicModal from "components/MediaLinkPublicModal";
import {Head} from 'next/document'
import {NextSeo} from 'next-seo'

const queryString = require('query-string')
interface Props{

}



const VideoPage = (props: Props) => {

    const links = [
        {value:'virtualSchool', label: 'ВШ ID'},
        {value:'temp', label: 'Временная'},
        {value:'public', label: 'Публичная'},

    ];
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const video = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const settings = [
    {value:'edit', label: 'Редактировать'},
    {value:'poster', label: 'Загрузить постер'},
    ...(video?.media?.type === 'video' ? [{value:'videoEditor', label: 'Редактировать видео'}] : []),
    {value:'copy', label: 'Вырезать'},
    {value:'delete', label: 'Удалить'}
  ];
  const dispatch = useDispatch();
    const  router = useRouter()
    console.log("Auth", props)
    useEffect(() => {
        dispatch(resetCatalogItem());
        if(!router.query.id){
            return;
        }

        dispatch(fetchCatalogItem(router.query.id, {showTags: '1'}));
    }, [router.query.id])
    const getDefaultSource = () => {
        const path = video.media?.fileName;
        const quality = video.media?.videoElements?.find(el => el.quality === '1080p')?.quality || video.media?.videoElements[video.media?.videoElements?.length - 1]?.quality;
        return quality ? getMediaPathWithQuality(path, quality) : getMediaPath(path);
    }
    const handleDownload = (item) => {
        window.location.href = item.value;
    }
    const getTagCategories = () => {
        const categoriesMap = {};
        const categories = []
        console.log("video?.tags", video?.tags)
        for (const tag of video?.tags) {
            if(!tag.tagCategory){
                continue;
            }
            if (!categoriesMap[tag.tagCategoryId]) {
                categoriesMap[tag.tagCategoryId] = { category: tag.tagCategory, tags: [tag] }
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
  return (
    <Layout>
      {video && <NextSeo title={video.name}/>}
    <Header {...props}/>
    {(!currentLoading  && video) &&  <div className={styles.root}>
      <div className={styles.title}>{video.name}</div>
      <BreadCrumbs items={[{name: 'Главная', link: '/'}, ...(video?.parents ? video?.parents : [])]}/>
        <div className={styles.content}>
        <div className={styles.videoWrapper}>
            {video.media?.type === 'video' && (!video.media || !video.media?.videoConverted || video.media?.videoCutting)  ?
                <>
                    <VideoConverting isCutting={video.media?.videoCutting}/>
                    <div className={styles.btns}>
                    <div className={styles.select} ><ButtonSelect onChange={handleSettingsClick} options={[{value: 'edit', label: 'Редактировать'}]} size="9px 20px">Настройки</ButtonSelect></div>
                </div>
                </>
        :
              video?.media ?  <>
        <Player
          isAudio={isAudio}
          poster={getMediaPath(video.poster)}
            sources={video.media?.videoElements?.map(el => ({label: el.quality, value: getMediaPathWithQuality(video.media.fileName, el.quality)}))}
            source={getDefaultSource()}/>
        <div className={styles.btns}>
          <div className={styles.select__down}>
            <ButtonSelect  href={isAudio ?  `${getDefaultSource()}?download=1` : null} size="9px 20px" minWidth="120px" onChange={handleDownload} options={video.media?.videoElements?.map(el => ({label: `${el.quality}`, tip: formatSize(el.size), value: `${getMediaPathWithQuality(video.media.fileName, el.quality)}&download=1`})) || []}>Скачать</ButtonSelect></div>
            {video?.canEdit && <div className={styles.select}><ButtonSelect onChange={handleLinksClick} options={links} size="9px 20px">Ссылки</ButtonSelect></div>}
            {video?.canEdit && <div className={styles.select}><ButtonSelect onChange={handleSettingsClick} options={settings} size="9px 20px">Настройки</ButtonSelect></div>}
        </div>
        </> : null}}
        <Info totalViews={video.media?.totalViews} authors={video.presenters} date={video.createdAt ? format(new Date(video.createdAt), 'dd.MM.yyy') : ''} language="Русский, Английский"/>
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
        {video?.media && <VideoCodeModal isOpen={modalKey === 'videoCode'} video={video} onRequestClose={() => dispatch(modalClose())}/>}
        {video?.media && <FilePosterModal isOpen={modalKey === 'filePoster'} file={video} onRequestClose={() => dispatch(modalClose())}/>}
        {(video?.media && modalKey === 'mediaLinkTemp') && <MediaLinkTempModal isOpen={true} file={video} onRequestClose={() => dispatch(modalClose())}/>}
        {(video?.media && modalKey === 'mediaLinkPublic') && <MediaLinkPublicModal isOpen={true} file={video} onRequestClose={() => dispatch(modalClose())}/>}
        {(video?.media && modalKey === 'mediaLinkVirtSchool') && <MediaLinkVirtSchoolModal isOpen={true} file={video} onRequestClose={() => dispatch(modalClose())}/>}

    </Layout>
  )
}

export default VideoPage
