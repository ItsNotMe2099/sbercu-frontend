import { useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'

interface Props{
  category: string
  tag: string
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
            <a className={cx(styles.item, { [styles.selected]: isSelected })} onClick={handleClick}>
              <span>{props.tag}</span>
            </a>
          </div>
  )
}

