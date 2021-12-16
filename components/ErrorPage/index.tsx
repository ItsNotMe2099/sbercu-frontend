import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  title?: string
  description?: string
}

export default function ErrorPage(props: Props) {
  return (
    <div className={styles.root}>

      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
      <Link href={'/'} ><a className={styles.logo} >Вернуться на главную</a></Link>
    </div>
  )
}
