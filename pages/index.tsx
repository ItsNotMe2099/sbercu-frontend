import styles from './index.module.scss'
import AuthSection from 'components/AuthSection';
import PasswordRecovery from 'components/PasswordRecovery';

export default function Home() {
  return (
      <div className={styles.root}>
          <PasswordRecovery />
      </div>
  )
}