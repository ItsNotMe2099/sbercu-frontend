import Button from "components/ui/Button";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Welcome from 'components/svg/Welcome'

export default function WelcomePage(props){
  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <Welcome/>
        <div className={styles.fakeMargin}></div>
          <div className={styles.text}>Добро пожаловать!</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
          <Button green size='12px 25px' onClick={() => logout()}>Выйти</Button>
          </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
    console.log("1212121212")
    return { props: {a:1} };
}

