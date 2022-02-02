import styles from './index.module.scss'
import React, {ReactElement} from 'react'
import SpeakerIcon from 'components/svg/SpeakerIcon'
import cx from 'classnames';
interface Props {
 photo?: string
  size: 'exSmall' | 'small' | 'normal' | 'large'
  children?: ReactElement | ReactElement[]
  onClick?: () => void | null
}

export default function SpeakerPhoto({photo, size, children, onClick}: Props) {


  return (
          <div className={cx(styles.root, {
            [styles.stub]: !photo,
            [styles.sizeExSmall]: size === 'exSmall',
            [styles.sizeSmall]: size === 'small',
            [styles.sizeNormal]: size === 'normal',
            [styles.sizeLarge]: size === 'large',

          })} onClick={onClick}>
            {photo ?
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/media/files/${photo}`}
                alt=''/>
              : <SpeakerIcon/>}
            {children}
          </div>
  )
}
