import styles from './index.module.scss'

interface Props{
  authors: string[]
  date: string
  language: string
}

export default function Info(props: Props){

  return (
          <div className={styles.root}>
              {props.authors.length > 0 && <div>{props.authors.length === 1 ? 'Спикер' : 'Спикеры'} : {props.authors.join(', ')}</div>}
            <div>{props.date}</div>
          </div>
  )
}

