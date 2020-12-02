import Button from "components/ui/Button";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

interface Props{

}

export default function Footer(props: Props){

  const dispatch = useDispatch()
   return (
    <div className={styles.root}>
        <div className={styles.wrapper}>
        <div className={styles.container}>

            <div className={styles.copyright}>
        © {(new Date()).getFullYear()} АНО ДПО «Корпоративный университет Сбербанка» <br/>
            <a href={''} target={'blank'}>Политика конфиденциальности</a>
            </div>
            <Button green  size='12px 25px' >Служба поддержки</Button>
        </div>
    </div>
    </div>
  )
}
