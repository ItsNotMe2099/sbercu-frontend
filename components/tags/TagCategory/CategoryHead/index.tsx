import { useRef, useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'
import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick'

interface Props{
  dots?: boolean,
  onEditClick?: (item) => void
  onDeleteClick?: (item) => void
}

export default function CategoryHead({onDeleteClick, onEditClick, ...props}: Props){
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
  }

  return (
    <>
    {props.dots ?
    <div className={styles.root}>
        <a className={styles.dots} onClick={onClick}><img src="img/icons/dots.svg" alt=''/>
          <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
            <div className={styles.option}><a>Редактировать</a></div>
            <div className={styles.option}><a>Удалить</a></div>
          </nav>
        </a>
    </div>
    :
    null}
    </>
  )
}
