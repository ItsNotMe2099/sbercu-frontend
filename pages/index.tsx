import AuthSection from "pages/auth-page/components/AuthSection";
import styles from './index.module.scss'
import NewPWFormSection from 'components/PasswordRecovery/NewPWFormSection'

export default function Home() {
  return (
      <div className={styles.root}>
          <AuthSection/>
      </div>
  )
}
