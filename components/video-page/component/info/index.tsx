import styles from 'components/video-page/component/info/index.module.scss'
import {pluralize} from 'utils/formatters'
import {ISpeaker} from 'types'
import SpeakerPhoto from 'components/speakers/SpeakerPhoto'
import Cross from 'components/svg/Cross'
import React from 'react'
import Link from 'next/link'

interface Props {
  presenters: string[]
  speakers?: ISpeaker[]
  date: string
  language: string
  totalViews: number
}

export default function Info(props: Props) {
  const {presenters, speakers, totalViews, date, language} = props;
  return (
    <div className={styles.root}>
      {[...(speakers || []), ...presenters].length > 0 && <div className={styles.speakers}>
        <div className={styles.label}>{[...(speakers || []), ...presenters].length === 1 ? 'Спикер:' : 'Спикеры:'} </div>
        {(speakers || []).map(speaker => <div className={styles.speakerWrapper}><Link href={`/speaker/${speaker.id}`}><a className={styles.speaker}>
          <SpeakerPhoto size={'exSmall'} photo={speaker.mainCover}/>
          <div className={styles.speakerName}>{speaker.name}</div>
        </a></Link></div>)}
        <div className={styles.presenters}>{presenters.join(', ')}</div>
      </div>}
      {props.totalViews > 0 &&
      <div className={styles.totalViews}>{props.totalViews} {pluralize(props.totalViews, 'просмотр', 'просмотра', 'просмотров')}</div>}
      <div className={styles.date}>{props.date}</div>
    </div>
  )
}
Info.defaultValue = {
  speakers: [],
  presenters: []
}

