import { useState } from 'react'
import styles from 'components/video-page/component/tag/index.module.scss'
import cx from 'classnames'
import {ITag} from "types";

interface Props{
  category: string
  tags: ITag[]
  onClick?: (tag) => void
}

export default function Tag(props: Props){

  const [isSelected, setIsSelected] = useState(false)
  const handleClick = (tag) => {
   if(props.onClick){
     props.onClick(tag);
   }
  }

  return (
          <div className={styles.tag}>
            <div className={styles.tagCategory}>{props.category}</div>
              {props.tags?.map(tag => <div className={styles.item} onClick={() => handleClick(tag)}>
              {tag.name}
            </div>)}
          </div>
  )
}

