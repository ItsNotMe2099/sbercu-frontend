import styles from './index.module.scss'
import EmailForm from '../EmailForm'
import NewPWForm from '../NewPWForm'

interface Props {}

export default function PasswordRecoveryHeader(props: Props) {
    return (
      <div className={styles.container}>
          <div className={styles.head}>media.</div>
          <div className={styles.recover}>Восстановление пароля</div>
      </div>
    )
  }
