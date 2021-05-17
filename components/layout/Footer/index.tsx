import Button from "components/ui/Button";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import {useRouter} from 'next/router'

interface Props{

}

export default function Footer(props: Props){
  const router = useRouter();
  const handleLogoClick = (e) => {
    if(router.route === '/'){
      e.preventDefault();
      location.reload();
    }
  }

   return (
    <div className={styles.root}>
        <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.top}>
              <Link href={'/'}><a onClick={handleLogoClick} className={styles.media}>media.</a></Link>
              <div className={styles.menu}>
                <a href={'https://media.sberbank-school.ru/welcome'} className={styles.menuLink}>Welcome</a>
                <div className={styles.menuSeparator}/>
                <a href={'https://media.sberbank-school.ru/updates'} className={styles.menuLink}>Что нового?</a>
                <div className={styles.menuSeparator}/>
                <a href={'https://media.sberbank-school.ru/firststeps'} className={styles.menuLink}>First steps</a>
              </div>
              <div className={styles.support}>
                Нашли ошибку? Напишите нам <br/><a href={'mailto:media@sber.university'} rel="noreferrer" target={'_blank'}>media@sber.university</a>
              </div>
            </div>
            <div className={styles.copyright}>
        <div>© {(new Date()).getFullYear()} АНО ДПО «Корпоративный университет Сбербанка» </div>
            <a href={''} target={'blank'}>Политика конфиденциальности</a>
            </div>

        </div>
    </div>
    </div>
  )
}
