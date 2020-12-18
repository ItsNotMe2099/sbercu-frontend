import styles from './index.module.scss'

interface Props{
  author: string
  date: string
  language: string
}

export default function Info(props: Props){

  return (
          <div className={styles.root}>
            <div>Автор: {props.author}</div>
            <div>{props.date}</div>
          </div>
  )
}

