import {fetchCatalogItemRequest, resetCatalogItem} from "components/catalog/actions";
import Layout from "components/layout/Layout";
import {confirmOpen, editFileOpen, modalClose, videoEditorConfirmOpen} from "components/Modal/actions";
import VideoEditor from "components/video/Editor";
import ModalEditorConfirm from "components/video/Editor/EditorConfirm";
import {useRouter} from "next/router";
import VideoConverting from "components/video-page/component/VideoConverting";
import {useEffect, useState} from "react";
import {IRootState} from "types";
import {getAuthServerSide} from "utils/auth";
import {getMediaPath, getMediaPathWithQuality} from "utils/media";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import {useDispatch, useSelector} from 'react-redux'

import TextEllipsis from 'react-text-ellipsis';

interface Props {

}


const Editor = (props: Props) => {
  const settings = [{value: 'share', label: 'Поделиться'}, {value: 'edit', label: 'Редактировать'}, {
    value: 'delete',
    label: 'Удалить'
  }]
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)

  const video = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [cutItems, setCutItems] = useState([]);
  const router = useRouter()
  useEffect(() => {
    dispatch(resetCatalogItem());
    if (!router.query.id) {
      return;
    }

    dispatch(fetchCatalogItemRequest(router.query.id, {showTags: '1'}));
  }, [router.query.id])
  const getDefaultSource = () => {
    const path = video.media.fileName;
    const qualityItem = video.media?.videoElements?.find(el => el.quality === '1080p') || video.media?.videoElements[video.media?.videoElements?.length - 1];
    const quality = qualityItem?.quality;
    return qualityItem && quality ? `${getMediaPathWithQuality(path, quality)}&duration=${qualityItem.duration}` : getMediaPath(path)

  }
  const handleCancel = (cutItems, duration) => {

    if (cutItems.length > 0) {
      dispatch(confirmOpen({
        title: 'Вы уверены, что хотите отменить все изменения?',
        description: '',
        confirmColor: 'red',
        cancelText: 'Нет',
        confirmText: 'Да',
        onConfirm: () => {
          dispatch(modalClose());
          router.replace(`/file/${router.query.id}`);
        }
      }));
    } else {
      router.replace(`/file/${router.query.id}`);
    }
  }
  const handleSubmit = (cutItems, duration) => {

    setCutItems(cutItems);
    setDuration(duration);
    dispatch(videoEditorConfirmOpen());
  }

  const handleDuration = (value) => {
    setDuration(value);
  }

  const handleChangeCutItems = (value) => {
    setCutItems(value);
  }
  return (
    <Layout>
      <Header {...props} showSearch={false}>
        {video && <div className={styles.header}>
            <TextEllipsis
                lines={1}
                tag={'div'}
                ellipsisChars={'...'}
                tagClass={'className'}
                debounceTimeoutOnResize={200}

                onResult={(result) => {
                }}>
                Редактирование «{video.name}»
            </TextEllipsis></div>}
      </Header>
      {!video?.media || !video.media?.videoConverted || video.media?.videoCutting &&
      <VideoConverting isCutting={video.media?.videoCutting} item={video}/>}
      {video?.media?.videoConverted && <div className={styles.root}>
          <VideoEditor
              poster={getMediaPath(video.poster)}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              sources={video.media?.videoElements?.map(el => ({
                label: el.quality,
                value: `${getMediaPathWithQuality(video.media.fileName, el.quality)}&duration=${el.duration}`
              }))}
              source={getDefaultSource()}/>
      </div>}
      <ModalEditorConfirm video={video} cutItems={cutItems} duration={duration}
                          isOpen={modalKey === 'videoEditorConfirm'}/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default Editor
