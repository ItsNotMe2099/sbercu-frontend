import { fetchCatalogItem, resetCatalogItem } from "components/catalog/actions";
import FileEditModal from "components/FileEditModal";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, editFileOpen, modalClose } from "components/Modal/actions";
import { useRouter } from "next/router";
import VideoConverting from "pages/video/[id]/component/VideoConverting";
import { useEffect } from "react";
import { IRootState } from "types";
import { withAuthSync } from "utils/auth";
import { getMediaPath, getMediaPathWithQuality } from "utils/media";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import BreadCrumbs from 'components/ui/Breadcrumbs';
import Tag from './component/tag';
import ButtonSelect from 'components/ui/ButtonSelect';
import Button from 'components/ui/Button';
import Info from './component/info';
import Player from 'components/video/Player';
import { useDispatch, useSelector } from 'react-redux'

import {format} from 'date-fns'
interface Props{

}



const Video = (props: Props) => {
  const settings = [{value: 'share', label: 'Поделиться'}, {value:'edit', label: 'Редактировать'}, {value:'videoEditor', label: 'Редактировать видео'}, {value:'delete', label: 'Удалить'}]
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const video = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const dispatch = useDispatch();
    const  router = useRouter()
    console.log("Query", router.query, video)
    useEffect(() => {
        dispatch(resetCatalogItem());
        if(!router.query.id){
            return;
        }

        dispatch(fetchCatalogItem(router.query.id, {showTags: '1'}));
    }, [router.query.id])
    const getDefaultSource = () => {
        const path = video.media.fileName;
        const quality = video.media?.videoElements?.find(el => el.quality === '1080p').quality || video.media?.videoElements[video.media?.videoElements?.length - 1]?.quality;
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
            case 'edit':
                dispatch(editFileOpen());
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
                    }
                }));
                break;
        }
    }

  return (
    <Layout>
    <Header/>
    {(!currentLoading  && video) &&  <div className={styles.root}>
      <div className={styles.title}>{video.name}</div>
      <BreadCrumbs items={[{name: 'Главная', link: '/'}, ...(video?.parents ? video?.parents : [])]}/>
        <div className={styles.content}>
        <div className={styles.videoWrapper}>
            {!video.media || !video.media.videoConverted  ?
                <>
                    <VideoConverting/>
                    <div className={styles.btns}>
                    <div className={styles.select} ><ButtonSelect onChange={handleSettingsClick} options={[{value: 'edit', label: 'Редактировать'}]} size="9px 20px">Настройки</ButtonSelect></div>
                </div>
                </>
        :
          <>
        <Player
            sources={video.media?.videoElements?.map(el => ({label: el.quality, value: getMediaPathWithQuality(video.media.fileName, el.quality)}))}
            source={getDefaultSource()}/>
        <div className={styles.btns}>
          <div className={styles.select__down}><ButtonSelect size="9px 20px" minWidth="112px" onChange={handleDownload} options={video.media?.videoElements?.map(el => ({label: el.quality, value: `${getMediaPathWithQuality(video.media.fileName, el.quality)}&download=1`}))}>Скачать</ButtonSelect></div>
          <div className={styles.regularBtn}><Button size="9px 20px" transparent brdrDarkGrey textDarkGrey>Копировать ВШ ID</Button></div>
          <div className={styles.select}><ButtonSelect onChange={handleSettingsClick} options={settings} size="9px 20px">Настройки</ButtonSelect></div>
        </div>
        </>}
        <Info authors={video.presenters} date={video.createdAt ? format(new Date(video.createdAt), 'dd.MM.yyy') : ''} language="Русский, Английский"/>
        </div>
        <div className={styles.tags}>
            {getTagCategories().map(category => <Tag
                category={category.category.name}
                tags={category.tags.map(tag => tag.name)}
            />)}
        </div>
    </div>
    <div className={styles.tags__mobile}>
        {getTagCategories().map(category => <Tag
            category={category.category.name}
            tags={category.tags.map(tag => tag.name)}
        />)}
        </div>
    </div>}
    </Layout>
  )
}

export default withAuthSync(Video)
