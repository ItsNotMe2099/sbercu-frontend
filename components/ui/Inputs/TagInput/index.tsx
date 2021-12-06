import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import TagCategory from "components/tags/TagCategory";
import {fetchTagCategoryList, resetTagCategoryList} from "components/tags/TagCategory/actions";
import ErrorInput from "components/ui/Inputs/components/ErrorInput";

import { useContext, useEffect, useRef, useState } from "react";
import {IRootState, ITagCategoryType} from "types";
import styles from './index.module.scss'
import cx from 'classnames'

import { useSelector, useDispatch } from 'react-redux'

interface Props {
  input?: any,
  meta?: any,
  disabled?: boolean,
  isIncludedCategory?: (category) => void
  categoryType?: ITagCategoryType
}

const TagInput = (props: Props) => {
  const { meta: { error, touched }, input, categoryType, ...rest} = props;
  const dispatch = useDispatch()
  const items = useSelector((state: IRootState) => state.tagCategory.list)
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    if(items.length > 0) {
      setSelectedTags((input.value ? input.value : []).map(item => {
        for(const tagCategory of items){
          const tag =  tagCategory.tags.find(tag => tag.id === item);
          if(tag){
            return tag;
          }
        }
    }));
    }
  }, [items])
  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    input.onChange(selectedTags.map( item => item.id))
  }, [selectedTags])
  useEffect(() => {
    dispatch(resetTagCategoryList())
    dispatch(fetchTagCategoryList(categoryType))
  }, [])
  const handleTagClick = (selectedItem, selected) => {
    if(props.disabled){
      return;
    }
    console.log("HandleTagClick", selectedItem, selected)
    if(selected) {
      setSelectedTags(tags => [...tags, selectedItem])

    }else{
      setSelectedTags(tags => tags.filter(item => item.id !== selectedItem.id))
    }
  }

  return (
      <div className={styles.root}>
        {items.filter(category => !props.isIncludedCategory || props.isIncludedCategory(category)).map(item => <TagCategory onTagClick={handleTagClick} selectedTags={selectedTags.filter(i => i.tagCategoryId === item.id)} editMode={false} item={item} />)}

      </div>

  );
};

TagInput.defaultProps = {
}
export default TagInput
