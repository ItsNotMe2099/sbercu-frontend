import { passwordRecoveryReset } from "pages/password-recovery-email/actions";
import { useEffect } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import Email from 'components/svg/Email'
import { useSelector, useDispatch } from 'react-redux'

export default function EmailSent() {
    const dispatch = useDispatch()
    const email = useSelector((state: IRootState) => state.PWRecoverEmail.email)
    useEffect(() => {
        return () => {
            dispatch(passwordRecoveryReset())
        }
    })
    return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <Email/>
        <div className={styles.fakeMargin}></div>
        <div className={styles.text}>Ссылка на восстановление пароля <br/>
          отправлена на электронную почту<br/>
          {email}</div>
      </div>
    </div>
  )
}
