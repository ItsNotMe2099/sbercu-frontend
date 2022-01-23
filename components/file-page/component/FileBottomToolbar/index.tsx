import styles from './index.module.scss'
import {formatSize, pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState, IUser} from 'types'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createMediaLinkTempDocViewer} from 'components/media-links/actions'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import ButtonSelect from 'components/ui/ButtonSelect'
import {getMediaPath, getMediaPathWithQuality} from 'utils/media'
import {format} from 'date-fns'
import Info from 'components/file-page/component/info'
import {
  confirmOpen,
  editFileOpen,
  filePosterUploadModalOpen, mediaLinkPublicModalOpen, mediaLinkTempModalOpen,
  mediaLinkVirtSchoolModalOpen
} from 'components/Modal/actions'
import {catalogCopy, deleteCatalog} from 'components/catalog/actions'
import {useRouter} from 'next/router'
import {isVideoConverting} from 'utils/video'

interface Props {
  item: ICatalogEntry
  user: IUser
}

export default function FileBottomToolbar(props: Props) {
  const {item} = props;

  const router = useRouter()
  const dispatch = useDispatch();

  const isVideo = item?.media?.type === 'video';
  const isAudio = item?.media?.type === 'audio';
  const isConverting = isVideoConverting(item);
  const links = [
    ...(item?.canEdit ? [
      {value: 'virtualSchool', label: 'ВШ ID'},
      {value: 'temp', label: 'Временная'},
    ] : []),
    {value: 'public', label: 'Публичная'},

  ];
  const settings = [
    {value: 'edit', label: 'Редактировать'},
    ...((isVideo || isAudio) ? [{value: 'poster', label: 'Загрузить постер'}] : []),
    ...(isVideo ? [{value: 'videoEditor', label: 'Редактировать видео'}] : []),
    {value: 'copy', label: 'Вырезать'},
    {value: 'delete', label: 'Удалить'}
  ];


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
        dispatch(catalogCopy(item));
        break;
      case 'videoEditor':
        router.push(`/video/${item?.id}/editor`)
        break;
      case 'delete':
        dispatch(confirmOpen({
          title: 'Вы уверены, что хотите удалить файл?',
          description: item.name,
          confirmColor: 'red',
          confirmText: 'Удалить',
          onConfirm: () => {
            dispatch(deleteCatalog(item?.id));
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
  const handleDownload = (item) => {
    window.location.href = item.value;
  }

  const renderEncodingToolbar = () => {
    return (
      <div className={styles.select}><ButtonSelect onChange={handleSettingsClick}
                                                   options={[{value: 'edit', label: 'Редактировать'}]}
                                                   size="9px 20px">Настройки</ButtonSelect></div>
    );
  }
  const renderFullToolbar = () => {
    return (<>
      <div className={styles.favorite}>
        <FavoriteCatalogButton item={item} style={'video'}/>
      </div>
      <div className={styles.select__down}>
        <ButtonSelect href={isVideo ? `${getMediaPath(item.media?.fileName)}?download=1` : null} size="9px 20px"
                      minWidth="120px" onChange={handleDownload}
                      options={item.media?.videoElements?.map(el => ({
                        label: `${el.quality}`,
                        tip: formatSize(el.size),
                        value: `${getMediaPathWithQuality(item.media.fileName, el.quality)}&download=1`
                      })) || []}>Скачать</ButtonSelect></div>
      {(item?.canEdit || ['admin', 'manager'].includes(props.user?.role)) &&
      <div className={styles.select}>
          <ButtonSelect onChange={handleLinksClick} options={links}
                        size="9px 20px">Ссылки</ButtonSelect></div>}
      {item?.canEdit &&
      <div className={styles.select}><ButtonSelect onChange={handleSettingsClick} options={settings}
                                                   size="9px 20px">Настройки</ButtonSelect></div>}
    </>)
  }
  return (
    <div className={styles.root}>
      <div className={styles.btns}>
        {isConverting ? renderEncodingToolbar() : renderFullToolbar()}
      </div>
      <Info totalViews={item.media?.totalViews} authors={item.presenters}
            date={item.createdAt ? format(new Date(item.createdAt), 'dd.MM.yyy') : ''}
            language="Русский, Английский"/>
    </div>
  )
}

