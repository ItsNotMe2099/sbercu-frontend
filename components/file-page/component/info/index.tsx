import styles from 'components/video-page/component/info/index.module.scss'
import {pluralize} from 'utils/formatters'

interface Props{
  authors: string[]
  date: string
  language: string
  totalViews: number
}

export default function Info(props: Props){

  return (
          <div className={styles.root}>
              {props.authors?.length > 0 && <div>{props.authors.length === 1 ? 'Спикер' : 'Спикеры'} : {props.authors.join(', ')}</div>}
            {props.totalViews > 0 && <div>{props.totalViews} {pluralize(props.totalViews, 'просмотр', 'просмотра', 'просмотров')}</div>}

            <div>{props.date}</div>
          </div>
  )
}

