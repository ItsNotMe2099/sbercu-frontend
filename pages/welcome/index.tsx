import styles from './index.module.scss'
import Welcome from 'components/svg/Welcome'

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <Welcome/>
        <div className={styles.fakeMargin}></div>
        <div className={styles.text}>Добро пожаловать!</div>
      </div>
    </div>
  )
}