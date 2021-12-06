import Link from 'next/link'
import { ICatalogEntry } from "types";
import styles from './index.module.scss'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import React from 'react'
import ButtonDots from 'components/ui/ButtonDots'

interface Props{
  item: ICatalogEntry
  onDeleteClick?: (item) => void
  onRestoreClick?: (item) => void
}

export default function Project({item, onDeleteClick, onRestoreClick}: Props){

  const getColorByType = (type) => {
    switch(type) {
      case 'black':
        return '#333333'
      case 'red':
        return '#EB5757'
      case 'yellow':
        return '#F2C94C'
      case 'blue':
      default:
        return '#2D9CDB'
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
  console.log('cover', item.projectCover)



  return (
    <Link href={`/catalog/${item.id}`}>
      <a className={styles.container}>
      <div className={styles.root}>
  <div className={`${item.projectCover !== "link to cover" && item.projectCover !== null ? styles.cover : styles.square}`} style={{backgroundColor: getColorByType(item.entryType)}}>
    {item.projectCover !== "link to cover" && item.projectCover !== null ?
    <img src={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/media/files/${item.projectCover}`} alt=''/>
    : null}
    {!item.deletedAt && <div className={styles.favorite}><FavoriteCatalogButton item={item} style={'project'}/></div>}
    {item.deletedAt && <div className={styles.dots}><ButtonDots
        style={'white'}
        showPaste={false}
        showEdit={false}
        showDelete={false}
        showCopy={false}
        showPublicLink={false}
        showBasketActions={true}
        onRestoreClick={handleRestoreClick}
        onDeleteBasketClick={handleDeleteClick}
    /></div>}
  </div>
      <div className={styles.title}>{item.name}</div>
    </div>
    </a>
    </Link>
  )
}
