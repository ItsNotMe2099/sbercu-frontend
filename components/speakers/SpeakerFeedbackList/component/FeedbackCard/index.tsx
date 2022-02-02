import Link from 'next/link'
import {ICatalogEntry, ISpeaker, ISpeakerFeedback} from "types";
import styles from 'components/speakers/SpeakerFeedbackList/component/FeedbackCard/index.module.scss'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import React from 'react'
import ButtonDots from 'components/ui/ButtonDots'
import {StarFilled, StarSmallFilled} from 'components/svg/Star'
import cx from 'classnames';
import DotsDropdown from 'components/ui/DotsDropdown'
interface Props {

  item: ISpeakerFeedback
  canEdit?: boolean
  onDeleteClick?: (item) => void
  onEditClick?: (item) => void
}

export default function FeedbackCard({item, canEdit, onDeleteClick, onEditClick}: Props) {

  const handleItemClick = (option) => {
    switch (option.key){
      case 'edit':
        onEditClick(item);
        break;
      case 'delete':
        onDeleteClick(item);
        break;
    }
  }
  return (
        <div className={cx(styles.root, {[styles.editable]: canEdit})}>
          <div className={styles.description}>{item.description}</div>
          <div className={styles.rating}><div className={styles.mark}>{item.mark}</div> <StarSmallFilled color={'black'}/></div>
          {canEdit && <DotsDropdown className={styles.dots} options={[{key: 'edit', label: 'Изменить'},{key: 'delete', label: 'Удалить'},]} onItemClick={handleItemClick}/>}
        </div>
  )
}
