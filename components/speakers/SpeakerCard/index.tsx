import Link from 'next/link'
import {ICatalogEntry, ISpeaker} from "types";
import styles from './index.module.scss'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import React from 'react'
import ButtonDots from 'components/ui/ButtonDots'
import {StarSmallFilled} from 'components/svg/Star'
import SpeakerPhoto from 'components/speakers/SpeakerPhoto'

interface Props {
  item: ISpeaker
  onDeleteClick?: (item) => void
  onRestoreClick?: (item) => void
}

export default function SpeakerCard({item, onDeleteClick, onRestoreClick}: Props) {

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
  console.log('cover', item.cover)

  return (
    <Link href={`/speaker/${item.id}`}>
      <a className={styles.container}>
        <div className={styles.root}>
            <SpeakerPhoto size={'normal'} photo={item.mainCover}/>
            <div className={styles.rating}><div className={styles.mark}>{item.rating?.toFixed(1) || 0}</div> <StarSmallFilled color={'white'}/></div>
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
          <div className={styles.title}>{item.name}</div>
        </div>
      </a>
    </Link>
  )
}
