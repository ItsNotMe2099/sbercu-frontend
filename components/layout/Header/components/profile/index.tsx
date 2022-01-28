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
import LikeOutline from 'components/svg/LikeOutline'
import BasketMenu from 'components/svg/BasketMenu'
import LikeFilled from 'components/svg/LikeFilled'

interface Props {
    user: IUser,
  showSearch?: boolean
}
export default function Profile({user, showSearch}: Props){
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = (e) => {
        e.preventDefault()
        setIsActive(!isActive);
    }
    const handleLogout = (e) => {
        e.preventDefault()
        logout();
    }

    const renderIcons = () => {
      return <>
        <Link href="/basket"><a className={cx(styles.link, {[styles.isActive]: router.asPath === '/basket'})}><BasketMenu/><span>Корзина</span></a></Link>
        <Link href="/favorite"><a className={cx(styles.link, {[styles.isActive]: router.asPath === '/favorite'})}>{router.asPath === '/favorite' ? <LikeFilled/> : <LikeOutline/>}<span>Избранное</span></a></Link>
      </>
    }
  return (
    <div className={styles.root}>
      {!showSearch ?
        <div className={styles.mobile}>{renderIcons()}</div>
        :null}
      <div className={styles.notMobile}>{renderIcons()}</div>

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
