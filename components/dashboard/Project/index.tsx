import styles from './index.module.scss'

interface Props{
  color: string
  title: string
}

export default function Project(props: Props){
  return (
    <div className={styles.root}>
      <div className={styles.square} style={{backgroundColor: props.color}}></div>
      <div className={styles.title}>{props.title}</div>
    </div>
  )
}
