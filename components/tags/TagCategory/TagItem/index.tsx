import { useRef, useState } from 'react'
import { ITag } from "types";
import styles from './index.module.scss'
import cx from 'classnames'
import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick'

interface Props{
  item: ITag
  isSelected?: boolean,
  onClick?: (item, selected) => void
  onEditClick?: (item) => void
  onDeleteClick?: (item) => void
  editMode: boolean
  green?: boolean
}

export default function TagItem({item, editMode, onClick, onDeleteClick, onEditClick, isSelected, ...props}: Props){
  const dropdownRefItem = useRef(null)
  const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);

  const handleClick = (e) => {
    e.preventDefault()
    if(onClick){
      onClick(item, !isSelected)
    }
    if(editMode) {
      setIsActiveItem(!isActiveItem);
    }
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
        <a className={cx(styles.item, { [styles.choosed]: isSelected})} onClick={handleClick}>
          {isSelected && <a className={styles.delete} onClick={handleClick}><img src="img/icons/delete.svg" alt=''/></a>}
          <span>{item.name}</span>
          <nav ref={dropdownRefItem} className={cx(styles.dropDown, { [styles.dropDownActive]: isActiveItem})}>
            <div className={styles.option}><a onClick={handleEditClick}>Редактировать</a></div>
            <div className={styles.option}><a onClick={handleDeleteClick}>Удалить</a></div>
          </nav>
        </a>
      </div>
  )
}
