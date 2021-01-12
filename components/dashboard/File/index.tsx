import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import ButtonDots from "components/ui/ButtonDots";
import Link from 'next/link'
import { useRef } from "react";
import { ICatalogEntry } from "types";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import cx from 'classnames'
import Dots from "components/svg/Dots";
import {format} from 'date-fns'
interface Props{
  item: ICatalogEntry,
  additionalInfo?: any,
  size?: any,
  basePath?: string,
  length?: any,
  onEditClick?: (item) => void
  onDeleteClick?: (item) => void
  onClick?: (e: React.MouseEvent) => void
}

export default function File({item, basePath, onDeleteClick, onEditClick, ...props}: Props){

  const getIconByType = (type) => {
    switch(type) {
      case 'video':
        return '/img/icons/camera.svg'
      case 'audio':
        return '/img/icons/audio.svg'
      case 'document':
        return '/img/icons/document.svg'
      case 'folder':
        return '/img/icons/folder.svg'
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
  const getFileLink = () => {
    if(item.entryType === 'file' && item.media.type === 'video' ){
      return `/video/${item.id}`;
    }
    if(item.entryType === 'file'){
      return getMediaPath(item.media.fileName);
    }
    return `${basePath}/${item.id}`;

  }
  return (
      <div className={styles.root}>
      <div className={styles.image}><img src={getIconByType(item.entryType === 'file' ? item.media?.type : 'folder')} alt=''/></div>
      <Link href={getFileLink()}>
      <a className={styles.inner}>
        <div className={styles.title}>
          {item.name}
        </div>
        <div className={styles.bottom}>
          <div className={styles.text}>{item.createdAt ? format(new Date(item.createdAt), 'dd.MM.yyy') : ''}</div>
          {item.projectManager &&  <div className={styles.separator}></div>}
          {item.projectManager &&  <div className={styles.text}>{item.projectManager}</div>}
          {props.additionalInfo ?
          <div className={styles.additional}>
            <div className={styles.separator}></div>
            <div className={styles.text}>{props.size}</div>
            <div className={styles.separator}></div>
            <div className={styles.text}>{props.length}</div>
          </div>
          :
          null}
        </div>
      </a>
      </Link>
      <ButtonDots onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>
      </div>
  )
}
