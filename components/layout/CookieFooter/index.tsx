import {ReactElement, useEffect, useState} from "react";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {ToastContainer} from 'react-toastify'
import Button from "components/ui/Button";
import Close from "@reactour/tour/dist/components/Close";
import cx from 'classnames'
import nookies from 'nookies'
import {setCookie} from 'nookies'
import {CookiesType} from "types/enums";
import {UserOnBoardingStatus} from "types";
import {CookiesLifeTime} from "types/constants";
interface Props{
    children?: any
}

export default function CookieFooter(props: Props){
    const [show, setShow] = useState(false)
    useEffect(() => {
        const cookies =  nookies.get(null) ?? {}
        if(!cookies[CookiesType.cookieAccepted]){
            setShow(true)
        }
    }, [])
    const handleClose = () => {
        handleAccept()
    }
    const handleAccept = () => {
        setCookie(null, CookiesType.cookieAccepted, '1', {
            maxAge: CookiesLifeTime.cookieAccepted * 60 * 60 * 24,
        });
        setShow(false)
    }
   return (
    <div className={cx(styles.root, {[styles.show]: show})}>

        <div className={styles.container}>

            <div className={styles.body}>
                <Button className={styles.close} closeBtn onClick={handleClose}></Button>
                <div className={styles.text}>
                    СберУниверситет, как и большинство сайтов в интернете, использует файлы cookie. На основе этих данных мы делаем наш сервис удобнее и эффективнее для пользователей. Продолжая пользоваться этим сайтом, вы соглашаетесь на использование cookie и обработку данных в соответствии с <a href={'https://sberuniversity.ru/legal/obshchie-usloviy/politika-po-obrabotke-personalnykh-dannykh/'} target={'_blank'}>Политикой обработки персональных данных</a>.
                </div>
                <div className={styles.buttons}>
                    <Button green size="9px 16px" onClick={handleAccept}>Принять</Button>
                </div>
            </div>
        </div>

    </div>
  )
}
