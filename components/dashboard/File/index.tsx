import Link from 'next/link'
import { ICatalogEntry } from "types";
import styles from './index.module.scss'

interface Props{
  item: ICatalogEntry,
  additionalInfo?: any,
  size?: any,
  basePath?: string,
  length?: any
}

export default function File({item, basePath, ...props}: Props){

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
      <div className={styles.dots}><a><img src="/img/icons/dots.svg" alt=''/></a></div>

    </div>
  )
}
