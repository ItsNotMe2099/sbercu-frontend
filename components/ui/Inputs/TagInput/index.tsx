import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import TagCategory from "components/tags/TagCategory";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import ErrorInput from "components/ui/Inputs/components/ErrorInput";

import { useContext, useEffect, useRef, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import cx from 'classnames'

import { useSelector, useDispatch } from 'react-redux'

interface Props {
  input?: any,
  meta?: any,

}

const TagInput = (props: Props) => {
  const { meta: { error, touched }, input, ...rest } = props;
  const dispatch = useDispatch()
  const items = useSelector((state: IRootState) => state.tagCategory.list)
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    setSelectedTags((input.value ? input.value : []).map(item => items.find(i => i.id === item.id)))
  }, [items])
  useEffect(() => {
    input.onChange(selectedTags.map( item => item.id))
  }, [selectedTags])
  useEffect(() => {
    dispatch(fetchTagCategoryList())
  }, [])
  const handleTagClick = (selectedItem, selected) => {
    console.log("HandleTagClick", selectedItem, selected)
    if(selected) {
      setSelectedTags(tags => [...tags, selectedItem])

    }else{
      setSelectedTags(tags => tags.filter(item => item.id !== selectedItem.id))
    }
  }

  return (
      <div className={styles.root}>
        {items.map(item => <TagCategory onTagClick={handleTagClick} selectedTags={selectedTags.filter(i => i.tagCategoryId === item.id)} editMode={false} item={item} />)}

      </div>

  );
};

TagInput.defaultProps = {
}
export default TagInput
