import styles from './index.module.scss'
import React, {ReactElement} from 'react'
import SpeakerIcon from 'components/svg/SpeakerIcon'
import cx from 'classnames';
interface Props {
 photo?: string
  size: 'small' | 'normal' | 'large'
  children?: ReactElement | ReactElement[]
}

export default function SpeakerPhoto({photo, size, children}: Props) {


  return (
          <div className={cx(styles.root, {
            [styles.stub]: !photo,
            [styles.sizeSmall]: size === 'small',
            [styles.sizeNormal]: size === 'normal',
            [styles.sizeLarge]: size === 'large',

          })}>
            {photo !== null ?
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/media/files/${photo}`}
                alt=''/>
              : <SpeakerIcon/>}
            {children}
          </div>
  )
}
