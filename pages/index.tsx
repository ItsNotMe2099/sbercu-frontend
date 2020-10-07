import styles from './index.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
      <div className={styles.root}>
          <Link href="/auth-page"><a>LINK</a></Link>
      </div>
  )
}