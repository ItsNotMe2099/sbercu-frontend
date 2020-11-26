import { useRef, useState } from 'react'
import styles from './index.module.scss'
import cx from 'classnames'
import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick'

interface Props{
  label: string
  green?: boolean
}

export default function TagItem(props: Props){
  const [selected, setSelected] = useState(false)
  const dropdownRefItem = useRef(null)
  const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);

  const onClickItem =(e) => {
    e.preventDefault()
    setIsActiveItem(!isActiveItem)
  }

  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    console.log("Click");
    setSelected(true)
    }

  return (
      <div className={styles.root}>
        {props.green ?
        <a className={cx(styles.item, { [styles.green]: selected})} onClick={(e) => handleActiveOptionClick(e)}>
          {selected ? <a className={styles.delete} onClick={(e) => onClickItem(e)}><img src="img/icons/delete.svg" alt=''/>
            <nav ref={dropdownRefItem} className={cx(styles.dropDown, { [styles.dropDownActive]: isActiveItem})}>
              <div className={styles.option}><a>Редактировать</a></div>
              <div className={styles.option}><a>Удалить</a></div>
            </nav>
          </a>
          :
          null
          }
          <span>{props.label}</span></a>
          :
          <a className={cx(styles.item, { [styles.choosed]: selected})} onClick={(e) => handleActiveOptionClick(e)}>
          {selected ? <a className={styles.delete} onClick={(e) => onClickItem(e)}><img src="img/icons/delete.svg" alt=''/>
            <nav ref={dropdownRefItem} className={cx(styles.dropDown, { [styles.dropDownActive]: isActiveItem})}>
              <div className={styles.option}><a>Редактировать</a></div>
              <div className={styles.option}><a>Удалить</a></div>
            </nav>
          </a>
          :
          null
          }
          <span>{props.label}</span></a>
        }
      </div>
  )
}
