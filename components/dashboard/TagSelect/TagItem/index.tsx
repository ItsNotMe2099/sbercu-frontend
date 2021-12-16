import styles from './index.module.scss'
import cx from 'classnames'
import { IRootState, ITag, ITagCategory } from "types";


interface Props {
  item: ITag,
  isSelected?: boolean,
  onClick?: (item, selected) => void
}

export const TagSelectItem = ({item, isSelected, onClick}: Props) => {

  const handleClick = (e) => {
    e.preventDefault()
    if(onClick){
      onClick(item, !isSelected)
    }
  }

  return (
      <a className={cx(styles.root, { [styles.selected]: isSelected })} onClick={handleClick}>
        {isSelected && <a className={styles.delete} onClick={handleClick}>
          <img src="img/icons/delete.svg" alt=''/>
        </a>}
        <span className={styles.label}>{item.name}</span>
      </a>
  );
};
