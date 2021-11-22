import styles from './index.module.scss'
import LikeFilled from 'components/svg/LikeFilled'
import LikeOutline from 'components/svg/LikeOutline'
import cx from 'classnames';
interface Props {
  className?: string
  selected?: boolean
  style: 'project' | 'catalog' | 'video'
  onClick?: (e) => void
}

export default function FavoriteButton({selected, onClick, style}: Props) {
  return (
   <div className={cx(styles.root, {[styles.project]: style === 'project', [styles.video]: style === 'video'})} onClick={onClick}>
     {selected ? <LikeFilled/> : <LikeOutline/>}
   </div>
  )
}


