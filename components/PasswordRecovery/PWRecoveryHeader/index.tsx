import styles from './index.module.scss'

interface Props {}

export default function PasswordRecoveryHeader(props: Props) {
    return (
      <div>
          <div className={styles.head}>media.</div>
          <div className={styles.recover}>Восстановление пароля</div>
      </div>
    )
  }
