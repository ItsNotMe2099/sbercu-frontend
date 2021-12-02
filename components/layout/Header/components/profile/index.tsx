import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick';
import { useRef } from 'react';
import { IUser } from "types";
import { logout } from "utils/auth";
import styles from './index.module.scss'
import cx from 'classnames'
import Link from 'next/link';
import {useRouter} from 'next/router'
import Basket from 'components/svg/Basket'
import * as React from 'react'

interface Props {
    user: IUser,
  showSearch?: boolean
}
export default function Profile({user, showSearch}: Props){
  const dropdownRef = useRef(null);
  const router = useRouter();
  console.log("Router", router);
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
      {!showSearch && <div className={cx(styles.favorite, {[styles.isActive]: router.asPath === '/favorite'})}><Link href="/favorite">Избранное</Link></div>}
      {!showSearch && <Link href="/basket"><a className={cx(styles.basket, {[styles.isActive]: router.asPath === '/basket'})}><Basket/></a></Link>}

      <a onClick={onClick}><img src="/img/icons/profile.svg" alt=''/></a>
        <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
            <div className={styles.option}><Link href="/profile">Личный кабинет</Link></div>

            {['admin'].includes(user?.role) && <div className={cx(styles.option, {[styles.isActive]: router.asPath === '/project/new'})}><Link href="/project/new">Создать проект</Link></div>}
            {['admin'].includes(user?.role) && <div className={cx(styles.option, {[styles.isActive]: router.asPath === '/tags'})}><Link href="/tags">Теги</Link></div>}
            {['admin'].includes(user?.role) && <div className={cx(styles.option, {[styles.isActive]: router.asPath === '/users'})}><Link href="/users">Пользователи</Link></div>}
            {['admin'].includes(user?.role) && <div className={cx(styles.option, {[styles.isActive]: router.asPath === '/jobs'})}><Link href="/jobs">Задания</Link></div>}
            <div className={styles.option}><a onClick={handleLogout}>Выход</a></div>
        </nav>
    </div>
  )
}
