import styles from 'components/video-page/component/VideoConverting/index.module.scss'
import {ICatalogEntry} from 'types'
import {FileJobInfo} from 'components/file/FileJobInfo'
import React from 'react'

interface Props{
    isCutting: boolean
  item: ICatalogEntry
}


export default function VideoConverting(props: Props){
  const {item} = props;
  return (
      <div className={styles.root}>
          <div className={styles.wait}>

                  <div className={styles.waitImage}>
                      <img className={styles.clock} src='/img/videos/clock.svg' alt=''/>
                      <img src='/img/videos/human.svg' alt=''/>
                  </div>
                  <div className={styles.bottom}>Видео {props.isCutting ? 'обрезается' : 'конвертируется'},<br/> пожалуйста подождите</div>
            <div className={styles.jobInfo}>
            <FileJobInfo item={item} />
            </div>
              </div>
      </div>
  )
}
