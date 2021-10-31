import { catalogCopy, catalogPaste, createCatalog } from "components/catalog/actions";
import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { confirmOpen } from "components/Modal/actions";
import ButtonDots from "components/ui/ButtonDots";
import Link from 'next/link'
import React, { useRef } from "react";
import { ICatalogEntry } from "types";
import { formatSize } from "utils/formatters";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import cx from 'classnames'
import Dots from "components/svg/Dots";

import { useDispatch } from 'react-redux'
import {format} from 'date-fns'
import {Circle} from 'rc-progress'
interface Props{
  item: ICatalogEntry,
  additionalInfo?: boolean,
  size?: any,
  onClick?: (item) => void
  basePath?: string,
  length?: any,
  canEdit: boolean
  onEditClick?: (item) => void
  onDeleteClick?: (item) => void
  onPublicLinkClick?: (item) => void
}

export default function File({item, basePath, onDeleteClick, onPublicLinkClick, onEditClick, onClick, canEdit, ...props}: Props){
  const dispatch = useDispatch();
  const getIconByType = (type) => {
    switch(type) {
      case 'video':
        return props.additionalInfo && (!item.media.videoConverted || item.media.videoCutting) ? '/img/icons/video_disabled.svg' : '/img/icons/camera.svg'
      case 'audio':
        return '/img/icons/audio.svg'
      case 'document':
        return '/img/icons/document.svg'
      case 'image':
        return '/img/icons/document.svg'
      case 'folder':
        return '/img/icons/folder.svg'
    }

  }


  const handleCopyClick = () => {
    dispatch(catalogCopy(item));
  }

  const handlePasteClick = () => {
    try{
      const copyItem = JSON.parse(localStorage.getItem('copyCatalog'));
      dispatch(confirmOpen({
        title: `Вы уверены, что хотите переместить ${copyItem.entryType === 'file' ? 'файл' : 'папку'} ?`,
        description: `${copyItem.entryType === 'file' ? 'Файл' : 'Папка'} «${copyItem.name}» будет ${copyItem.entryType === 'file' ? 'перемещен' : 'перемещена'} в ${item.entryType === 'project' ? 'проект' : 'папку'} «${item.name}»`,
        confirmText: 'Переместить',
        onConfirm: () => {
          dispatch(catalogPaste(item.id));
        }
      }));
    }catch (e) {

    }


  }
  const handleEditClick = () => {
    if(onEditClick){
      onEditClick(item)
    }
  }
  const handleDeleteClick = () => {
    if(onDeleteClick){
      onDeleteClick(item)
    }
  }
  const handlePublicLinkClick = () => {
    if(onPublicLinkClick){
      onPublicLinkClick(item)
    }
  }
  const getFileLink = () => {
    if(item.entryType === 'file' && item.media?.type === 'video' ){
      return `/video/${item.id}`;
    }
    if(item.entryType === 'file' && item.media?.type === 'audio' ){
      return `/audio/${item.id}`;
    }
    if(item.entryType === 'file'){
      return getMediaPath(item.media?.fileName)  ? `${getMediaPath(item.media?.fileName)}?download=1`  : '';
    }
    console.log("Item link", item, item.id, basePath);
    return `/catalog/${item.id}`;

  }
  const getDetailsText = () => {

  }
  const getMediaSize = () => {
    if(item.entryType === 'file' && item.media?.type === 'video' && item.media.videoElements?.length > 0){
        return item.media.videoElements.find(i => i.quality === '1080p')?.size || item.media.size;
    }else if(item.entryType === 'file'){
      return item.media.size;
    }
  }
  const handleClick = (item) => {
    if(onClick){
      onClick(item);
    }
  }
  return (
      <div className={styles.root}>
      <div className={styles.image}><img src={getIconByType(item.entryType === 'file' ? item.media?.type : 'folder')} alt=''/></div>
      <Link href={getFileLink()}>
      <a className={styles.inner} onClick={handleClick} target={item.entryType === 'file' && item.media?.type !== 'video' ? 'blank' : ''}>
        <div className={styles.title}>
          {item.name}
        </div>
        {item.highlight?.fileExtractedText && <div className={styles.highlight}>Найдено в содержимом</div>}
        <div className={styles.bottom}>
          <div className={styles.text}>{item.createdAt ? format(new Date(item.createdAt), 'dd.MM.yyy') : ''}</div>
          {item.presenters?.length > 0 &&  <div className={styles.separator}></div>}
          {item.presenters?.length > 0 &&  <div className={styles.text}>{item.presenters.join(', ')}</div>}

          {props.additionalInfo && item.entryType === 'file' && item.media ?
          <div className={styles.additional}>
            <div className={styles.separator}></div>
            {item.media.size && <div className={styles.text}>{formatSize(getMediaSize())}</div>}
            {/*<div className={styles.separator}></div>
            <div className={styles.text}>{props.length}</div>*/}
          </div>
          :
          null}
        </div>
      </a>
      </Link>
        {true && <div className={styles.encoding}>
            <div className={styles.loader}><div className={styles.progressCircle}><Circle percent={28} strokeWidth={4} strokeColor="#27AE60" /> </div> <div className={styles.loaderProgress}>24%</div></div>
            <div className={styles.status}>
            Видео {item.media.videoCutting ? 'обрезается' : 'обрабатывается'}</div>
            <div className={styles.details}></div>
        </div>}
        {canEdit && <ButtonDots showPaste={item.entryType !== 'file'} onCopyClick={handleCopyClick} onPasteClick={handlePasteClick} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} onPublicLinkClick={handlePublicLinkClick}/>}
      </div>
  )
}

File.defaultProps = {
  additionalInfo: true
}
