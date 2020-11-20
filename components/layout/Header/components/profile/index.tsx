import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick';
import { useRef } from 'react';
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

  return (
    <div className={styles.root}>
        <a onClick={onClick}><img src="img/icons/profile.svg" alt=''/></a>
        <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
          <div className={styles.option}><Link href="">Личный кабинет</Link></div>
          <div className={styles.option}><Link href="">Выход</Link></div>
        </nav>
    </div>
  )
}
