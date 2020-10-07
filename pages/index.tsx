import styles from './index.module.scss'
import AuthSection from 'components/AuthSection';
import PasswordRecovery from 'components/PasswordRecovery/PWRecoveryHeader';
import Link from 'next/link'

export default function Home() {
  return (
      <div className={styles.root}>
          <Link href="/welcome"><a>Welcome</a></Link>
      </div>
  )
}