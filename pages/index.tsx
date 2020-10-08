import styles from './index.module.scss'
import AuthSection from 'components/AuthSection'
import NewPWFormSection from 'components/PasswordRecovery/NewPWFormSection'

export default function Home() {
  return (
      <div className={styles.root}>
          <NewPWFormSection/>
      </div>
  )
}