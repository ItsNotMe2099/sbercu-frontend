import { TagSelectCategoryItem } from "components/dashboard/TagSelect/TagCategoryItem";
import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './index.module.scss'
import cx from 'classnames'
import { IRootState, ITag, ITagCategory } from "types";
import { fetchTag } from "./actions";
import * as React from 'react'

interface Props {
  items: ITagCategory[],
  onChangeSelectedTags?: (tags: ITag[]) => void,
  selectedTags: ITag[],
  initialTags?: number[]
}

export const TagSelect = (props: Props) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState(props.selectedTags)
  const [isInit, setIsInit] = useState(false)
  useEffect(() => {
      if(props.onChangeSelectedTags && isInit){
        props.onChangeSelectedTags(selectedTags);
      }
      setIsInit(true);
  }, [selectedTags])
  const handleTagClick = (selectedItem, selected) => {
    if(selected) {
      setSelectedTags(tags => [...tags, selectedItem])
    }else{
      setSelectedTags(tags => tags.filter(item => item.id !== selectedItem.id))
    }
  }
  useEffect(() => {
    if(props.initialTags.length > 0 && props.items.length > 0){
      const newTags = [];
      for(const tagId of props.initialTags){
        for(const tagCategory of props.items){
          const tag = tagCategory.tags.find(tag => tag.id === tagId);
          if(tag){
            newTags.push(tag);
          }
        }
      }
      setSelectedTags(newTags);
    }
  }, [])
  const handleSelectedTagClick = (e, selectedItem) => {
    e.preventDefault();
    handleTagClick(selectedItem, false);
  }
  return (
    <>
    <div className={styles.root}  data-tour={'tag-select'}>
        {props.items.map(item => <TagSelectCategoryItem item={item} selectedTags={selectedTags.filter(i => i.tagCategoryId === item.id)} onTagClick={handleTagClick}/>)}
      <div className={styles.transparent}></div>
    </div>
    { selectedTags.length > 0 &&
      <div className={styles.filtered}>
        {selectedTags.map(item => (<a className={styles.choosed}>
          <a className={styles.delete} onClick={(e) => handleSelectedTagClick(e, item)}><img src="img/icons/delete.svg" alt=''/></a><span className={styles.dropdownItemLabel}>{item.name}</span></a>))}
      </div>
    }
    </>
  );
};
TagSelect.defaultProps = {
  initialTags: []
}
