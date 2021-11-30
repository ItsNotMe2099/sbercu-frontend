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
  const [isHover, setIsHover] = useState(false);
  const [isSelectedNow, setIsSelectedNow] = useState(false);
  useEffect(() => {
    if(isHover){
      console.log("setIsSelectedNow")
      setIsSelectedNow(true)
    }
  }, [selected])

  return (
   <div className={cx(styles.root, {[styles.selected]: selected, [styles.project]: style === 'project', [styles.catalog]: style === 'catalog', [styles.video]: style === 'video'})}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false)
          console.log("onMouseLeave")
          setIsSelectedNow(false)
        }}
        onClick={onClick}>
     { selected ? isHover && !isSelectedNow ?  <LikeOutline/>  : <LikeFilled/> : isHover && !isSelectedNow ? <LikeFilled/> : <LikeOutline/>}
   </div>
  )
}


