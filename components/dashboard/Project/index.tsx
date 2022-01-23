import Link from 'next/link'
import {FileActionType, ICatalogEntry} from "types";
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

  const noop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  const actions = (() => {
    let actions = [
      {name: 'Восстановить', key: FileActionType.Restore},
      {name: 'Удалить  навсегда', key: FileActionType.DeleteForever},
    ];

    return actions;

  })()
  const handleActionClick = (action: FileActionType) => {
    switch (action) {
      case FileActionType.Restore:
        if (onRestoreClick) {
          onRestoreClick(item)
        }
        break;
      case FileActionType.DeleteForever:
        if (onDeleteClick) {
          onDeleteClick(item)
        }
        break;
    }
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
              options={actions}
                onClick={handleActionClick}
            /></div>}
          </div>
          <div className={styles.title}>{item.name}</div>
      </a>
    </Link>
  )
}
