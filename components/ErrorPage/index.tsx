import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  title?: string
}

export default function ErrorPage(props: Props) {
  return (
    <div className={styles.root}>
      <Link href={'/'} ><a className={styles.logo} >media.</a></Link>
      <div className={styles.title}>{props.title}</div>
    </div>
  )
}
