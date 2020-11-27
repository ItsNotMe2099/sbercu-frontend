import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import Link from 'next/link'
import { useRef } from "react";
import { ICatalogEntry } from "types";
import styles from './index.module.scss'
import cx from 'classnames'

interface Props{
  item: ICatalogEntry,
  additionalInfo?: any,
  size?: any,
  basePath?: string,
  length?: any,
  onEditClick?: (item) => void
  onDeleteClick?: (item) => void
}

export default function File({item, basePath, onDeleteClick, onEditClick, ...props}: Props){
  const dropdownRefItem = useRef(null)
  const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);

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
  const handleClick = (e) => {
    e.preventDefault()
      setIsActiveItem(!isActiveItem);

  }
  const handleEditClick = (e) => {
    e.preventDefault()
    if(onEditClick){
      onEditClick(item)
    }
    setIsActiveItem(false);
  }
  const handleDeleteClick = (e) => {
    e.preventDefault()
    if(onDeleteClick){
      onDeleteClick(item)
    }
    setIsActiveItem(false);
  }
  return (
      <div className={styles.root}>
      <div className={styles.image}><img src={getIconByType(item.entryType)} alt=''/></div>
      <Link href={`${basePath}/${item.id}`}>
      <a className={styles.inner}>
        <div className={styles.title}>
          {item.name}
        </div>
        <div className={styles.bottom}>
          <div className={styles.text}>{item.createdAt}</div>
          <div className={styles.separator}></div>
          <div className={styles.text}>{item.projectManager}</div>
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
      <div className={styles.dots}><a onClick={handleClick}><img src="/img/icons/dots.svg" alt=''/></a>

        <nav ref={dropdownRefItem} className={cx(styles.dropDown, { [styles.dropDownActive]: isActiveItem})}>
          <div className={styles.option}><a onClick={handleEditClick}>Редактировать</a></div>
          <div className={styles.option}><a onClick={handleDeleteClick}>Удалить</a></div>
        </nav>
      </div>

    </div>
  )
}
