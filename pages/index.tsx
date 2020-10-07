import styles from './index.module.scss'
import AuthSection from 'components/AuthSection'

export default function Home() {
  return (
      <div className={styles.root}>
          <AuthSection/>
      </div>
  )
}