import styles from './index.module.scss'
import LikeFilled from 'components/svg/LikeFilled'
import LikeOutline from 'components/svg/LikeOutline'
import cx from 'classnames';
import {useEffect, useState} from 'react'
interface Props {
  className?: string
  selected?: boolean
  style: 'project' | 'catalog' | 'video'
  onClick?: (e) => void
}

export default function FavoriteButton({selected, onClick, style}: Props) {

  const [isSelectedNow, setIsSelectedNow] = useState(false);


  const handleClick = (e) => {
    setIsSelectedNow(true)
    onClick(e);
  }
  return (
   <div className={cx(styles.root, {[styles.selected]: selected, [styles.nonSelected]: !selected, [styles.tempSelected]: isSelectedNow, [styles.project]: style === 'project', [styles.catalog]: style === 'catalog', [styles.video]: style === 'video'})}
      onMouseLeave={() =>   setIsSelectedNow(false)}
        onClick={handleClick}>
     <div className={styles.icon}/>
   </div>
  )
}


