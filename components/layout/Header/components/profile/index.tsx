import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick';
import { useRef } from 'react';
import { logout } from "utils/auth";
import styles from './index.module.scss'
import cx from 'classnames'
import Link from 'next/link';

export default function Profile(props){
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = (e) => {
        e.preventDefault()
        setIsActive(!isActive);
    }
    const handleLogout = (e) => {
        e.preventDefault()
        logout();
    }

  return (
    <div className={styles.root}>
        <a onClick={onClick}><img src="/img/icons/profile.svg" alt=''/></a>
        <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
            <div className={styles.option}><Link href="/profile">Личный кабинет</Link></div>
            <div className={styles.option}><Link href="/project/new">Создать проект</Link></div>
            <div className={styles.option}><Link href="/tags">Тэги</Link></div>
            <div className={styles.option}><Link href="/users">Пользователи</Link></div>
          <div className={styles.option}><a onClick={handleLogout}>Выход</a></div>
        </nav>
    </div>
  )
}
