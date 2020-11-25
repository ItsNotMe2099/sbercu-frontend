import { useRef, useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'
import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick'

interface Props{
}

export default function CategoryHead(props: Props){
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = (e) => { 
    e.preventDefault()
    setIsActive(!isActive);
  }

  return (
    <div className={styles.root}>
        <a className={styles.dots} onClick={onClick}><img src="img/icons/dots.svg" alt=''/>
          <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
            <div className={styles.option}><a>Редактировать</a></div>
            <div className={styles.option}><a>Удалить</a></div>
          </nav>
        </a>
    </div>
  )
}
