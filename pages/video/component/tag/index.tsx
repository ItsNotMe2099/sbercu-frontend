import { useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'

interface Props{
  category: string
  tags: string[]
}

export default function Tag(props: Props){

  const [isSelected, setIsSelected] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    if(!isSelected){
      setIsSelected(true)
    }
    else{
      setIsSelected(false)
    }
  }

  return (
          <div className={styles.tag}>
            <div className={styles.tagCategory}>{props.category}</div>
              {props.tags.map(tag => <div className={styles.item}>
              {tag}
            </div>)}
          </div>
  )
}

