import styles from './index.module.scss'
import React from 'react'
import SpeakerIcon from 'components/svg/SpeakerIcon'
import cx from 'classnames';
interface Props {
 photo?: string
  size: 'small' | 'normal' | 'large'
}

export default function SpeakerPhoto({photo, size}: Props) {


  return (
          <div className={cx(styles.root, {
            [styles.stub]: !photo,
            [styles.sizeSmall]: size === 'small',
            [styles.sizeNormal]: size === 'normal',
            [styles.sizeLarge]: size === 'large',

          })}>
            {photo !== null ?
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || 'https://dev.sbercu.firelabs.ru'}/api/media/files/${photo}`}
                alt=''/>
              : <SpeakerIcon/>}
          </div>
  )
}
