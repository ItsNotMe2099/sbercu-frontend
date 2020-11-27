import { TagSelectCategoryItem } from "components/dashboard/TagSelect/TagCategoryItem";
import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './index.module.scss'
import cx from 'classnames'
import { IRootState, ITagCategory } from "types";
import { fetchTag } from "./actions";

interface Props {
  items: ITagCategory[]
}

export const TagSelect = (props: Props) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([])
  const handleTagClick = (selectedItem, selected) => {
    console.log("HandleTagClick", selectedItem, selected)
    if(selected) {
      setSelectedTags(tags => [...tags, selectedItem])
    }else{
      setSelectedTags(tags => tags.filter(item => item.id !== selectedItem.id))
    }
  }
  const handleSelectedTagClick = (e, selectedItem) => {
    e.preventDefault();
    handleTagClick(selectedItem, false);
  }
  return (
    <>
    <div className={styles.root}>
        {props.items.map(item => <TagSelectCategoryItem item={item} selectedTags={selectedTags.filter(i => i.tagCategoryId === item.id)} onTagClick={handleTagClick}/>)}
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
