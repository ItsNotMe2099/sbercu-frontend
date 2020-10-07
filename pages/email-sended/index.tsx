import styles from './index.module.scss'
import Email from 'components/svg/Email'

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <Email/>
        <div className={styles.fakeMargin}></div>
        <div className={styles.text}>Ссылка на восстановление пароля <br/>
          отправлена на электронную почту<br/>
          e-mail@sberbank.ru</div>
      </div>
    </div>
  )
}