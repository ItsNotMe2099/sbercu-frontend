import {  TagSelectItem } from "components/dashboard/TagSelect/TagItem";
import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './index.module.scss'
import cx from 'classnames'
import { IRootState, ITag, ITagCategory } from "types";
import { Scrollbars } from 'react-custom-scrollbars';
interface Props {
  item: ITagCategory,
  onTagClick?: (item, selected) => void,
  selectedTags: ITag[]
}

export const TagSelectCategoryItem = ({item, onTagClick, selectedTags}: Props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const tags = item.tags.sort((a, b) => {
    if (a.name < b.name) return -1
    return a.name > b.name ? 1 : 0
  })
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }


  return (
    <div className={styles.root}>
      <a href="#" onClick={handleClick} className={cx(styles.dropDownTrigger, { [styles.isSelected]: selectedTags.length > 0 }, {[styles.isActive]: isActive})}>{item.name}</a>
       <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
         <Scrollbars
             autoHeight
             autoHeightMin={0}
             autoHeightMax={145}>
           <div className={styles.dropDownWrapper}>
         {tags.map(item => <TagSelectItem  item={item} isSelected={!!selectedTags.find(i => i.id === item.id)} onClick={onTagClick}/>)}
           </div>
         </Scrollbars>
         </nav>
    </div>
  );
};
