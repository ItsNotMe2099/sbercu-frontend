import { catalogCopy, catalogPaste, createCatalog } from "components/catalog/actions";
import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { confirmOpen } from "components/Modal/actions";
import ButtonDots from "components/ui/ButtonDots";
import Link from 'next/link'
import React, { useRef } from "react";
import { ICatalogEntry } from "types";
import {formatJobStatusName, formatSeconds, formatSize} from "utils/formatters";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import cx from 'classnames'
import Dots from "components/svg/Dots";

import { useDispatch } from 'react-redux'
import {format} from 'date-fns'
import {Circle} from 'rc-progress'
import Cross from 'components/svg/Cross'
import LikeOutline from 'components/svg/LikeOutline'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import BreadCrumbs from 'components/ui/Breadcrumbs'
interface Props{
  item: ICatalogEntry,
  additionalInfo?: boolean,
  showFavorite?: boolean,
  showBreadcrumbs?: boolean
  showBasketActions?: boolean
  size?: any,
  onClick?: (item) => void
  basePath?: string,
  length?: any,
  canEdit: boolean
  onEditClick?: (item) => void
  onDeleteClick?: (item) => void
  onRestoreClick?: (item) => void
  onPublicLinkClick?: (item) => void
  userRole?: string
}
interface FileJobProps{
  item: ICatalogEntry
}
const FileJobInfo = ({item}: FileJobProps) => {
  const job = item?.media?.lastJob;
  console.log("estimatedTimeInSeconds", job?.estimatedTimeInSeconds)
  return <div className={styles.jobInfo}>

    {['pending'].includes(job.state) && <div className={styles.statusIcon} style={{borderColor: '#F2C94C'}}><Dots color={'#F2C94C'}/></div>}

    {['canceled'].includes(job.state) && <div className={styles.statusIcon} style={{borderColor: '#F2C94C'}}><Cross color={'#F2C94C'}/></div>}
    {['error'].includes(job.state) && <div className={styles.statusIcon} style={{borderColor: '#EB5757'}}><Cross color={'#EB5757'}/></div>}

    {['finished'].includes(job.state) && <div className={styles.statusIcon}><img src={'/img/icons/mark.svg'}/></div>}
    {['started'].includes(job.state) && <div className={styles.loader}>
        <div className={styles.progressCircle}>
            <Circle percent={job.progress?.percent} strokeWidth={4} strokeColor="#27AE60"/>
        </div>
        <div className={styles.loaderProgress}>{job.progress?.percent > 100 ? 100 : job.progress?.percent?.toFixed(1)}%</div>
    </div>}
    <div className={styles.status}>
      {formatJobStatusName(job.state)}
      {job?.estimatedTimeInSeconds > 0 && <div className={styles.estimate}>
        Осталось: ~{formatSeconds(job?.estimatedTimeInSeconds)}
      </div>}
    </div>

  </div>
}
const FileDeleted = ({item}: FileJobProps) => {
  const job = item?.media?.lastJob;
  return <div className={styles.deleted}>

  </div>
}
export default function File({item, basePath, userRole, onDeleteClick, onRestoreClick, onPublicLinkClick, onEditClick, onClick, canEdit, ...props}: Props){
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
  const handleRestoreClick = () => {
    if(onRestoreClick){
      onRestoreClick(item)
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
  const showDots = (canEdit || ['admin', 'manager'].includes(userRole));

  const noop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  console.log("item.deletedAt ", item.deletedAt );
  return (
      <div className={cx(styles.root, {[styles.withDots]: showDots, [styles.deleted]: !!item.deletedAt})}>
      <div className={styles.image}><img src={getIconByType(item.entryType === 'file' ? item.media?.type : 'folder')} alt=''/></div>
      <Link href={getFileLink()}  >
      <a  className={styles.inner} onClick={item.deletedAt ? noop : handleClick} target={item.entryType === 'file' && item.media?.type !== 'video' ? 'blank' : ''}>
        <div className={styles.title}>
          {item.name}
        </div>
        {item.highlight?.fileExtractedText && <div className={styles.highlight}>Найдено в содержимом</div>}
        <div className={styles.bottom}>
          <div className={styles.text}>{item.createdAt ? format(new Date(item.createdAt), 'dd.MM.yyy') : ''}</div>
          {item.deletedAt &&<><div className={styles.separator}/><div className={styles.text}>Удалено: {item.deletedAt ? format(new Date(item.deletedAt), 'dd.MM.yyy HH:mm') : ''}</div></>}
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
        {(item.parents && props.showBreadcrumbs) && <BreadCrumbs className={styles.breadcrumbs} items={(item?.parents || []).map(i => ({link: `/catalog/${i.id}`, name: i.name, deleted: !!i.deletedAt})).splice(0, item?.parents?.length - 1)} />}


      </a>
      </Link>
        {item?.media?.lastJob && item?.media?.lastJob.state !== 'finished' && <FileJobInfo item={item} />}

        {!item.deletedAt && props.showFavorite && <div className={styles.like}><FavoriteCatalogButton item={item} style={'catalog'}/></div>}
        {item.deletedAt && <ButtonDots
            showPaste={false}
          showEdit={false}
          showDelete={false}
          showCopy={false}
          showPublicLink={false}
          showBasketActions={props.showBasketActions}
          onRestoreClick={handleRestoreClick}
          onDeleteBasketClick={handleDeleteClick}
            />}

        {showDots && <ButtonDots
            showEdit={canEdit}
          showDelete={canEdit}
          showCopy={canEdit}
            showPublicLink={item.entryType === 'file' && ['admin', 'manager'].includes(userRole)} showPaste={ canEdit && item.entryType !== 'file'} onCopyClick={handleCopyClick} onPasteClick={handlePasteClick} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} onPublicLinkClick={handlePublicLinkClick}/>}
      </div>
  )
}

File.defaultProps = {
  additionalInfo: true,
  showFavorite: false
}
