import styles from './index.module.scss'
import AuthForm from '../components/AuthForm';

export default function Home() {
  return (
      <div className={styles.root}>
          <AuthForm></AuthForm>
      </div>
  )
}