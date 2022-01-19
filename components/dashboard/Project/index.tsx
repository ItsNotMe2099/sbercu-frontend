import Link from 'next/link'
import {ICatalogEntry} from "types";
import styles from './index.module.scss'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import React from 'react'
import ButtonDots from 'components/ui/ButtonDots'
import cx from 'classnames'
interface Props {
  item: ICatalogEntry
  onDeleteClick?: (item) => void
  onRestoreClick?: (item) => void
}

export default function Project({item, onDeleteClick, onRestoreClick}: Props) {

  const getColorByType = (type) => {
    switch (type) {
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
    if (onDeleteClick) {
      onDeleteClick(item)
    }
  }
  const handleRestoreClick = () => {
    if (onRestoreClick) {
      onRestoreClick(item)
    }
  }
  const noop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Link href={`/catalog/${item.id}`}>
      <a className={cx(styles.root, {[styles.deleted]: !!item.deletedAt})}  onClick={item.deletedAt ? noop : null}>
          <div
            className={`${item.projectCover !== "link to cover" && item.projectCover !== null ? styles.cover : styles.square}`}>
            {item.projectCover !== "link to cover" && item.projectCover !== null ?
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || 'https://dev.sbercu.firelabs.ru'}/api/media/files/${item.projectCover}`}
                alt=''/>
              : null}
            {!item.deletedAt && <div className={cx(styles.favorite, {[styles.noFavorite]: !item.inFavorites})}><FavoriteCatalogButton item={item} style={'project'}/></div>}
            {item.deletedAt && <div className={styles.dots}><ButtonDots
                style={'white'}
                showBasketActions={true}
                onRestoreClick={handleRestoreClick}
                onDeleteBasketClick={handleDeleteClick}
            /></div>}
          </div>
          <div className={styles.title}>{item.name}</div>
      </a>
    </Link>
  )
}
