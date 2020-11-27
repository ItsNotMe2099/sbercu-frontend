import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import TagItem from "components/tags/TagCategory/TagItem";
import { useRef } from "react";
import { IUser } from "types";
import styles from './index.module.scss'
import cx from 'classnames'
interface Props {
  user: IUser
  onEditClick?: (item: IUser) => void
  onDeleteClick?: (item: IUser) => void
}

export default function UserListRow({user, onEditClick, onDeleteClick}: Props){
    const dropdownRefItem = useRef(null)
    const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);
    const handleClick = (e) => {
        e.preventDefault()
        setIsActiveItem(!isActiveItem);

    }
    const handleEditClick = (e) => {
        e.preventDefault()
        if(onEditClick){
            onEditClick(user)
        }
        setIsActiveItem(false);
    }
    const handleDeleteClick = (e) => {
        e.preventDefault()
        if(onDeleteClick){
            onDeleteClick(user)
        }
        setIsActiveItem(false);
    }
  return (
    <div className={styles.root}>
      <div className={`${styles.cell}`}>{user?.lastName} {user?.firstName}</div>
      <div className={`${styles.cell} ${styles.status} ${user?.inviteToken ? styles.statusInviteSent : styles.statusRegistered}`}>{user?.inviteToken ? 'Приглашение отправлено' : 'Зарегистрирован'}</div>
      <div className={`${styles.cell}`}>{user?.virtualSchoolId}</div>
      <div className={`${styles.cell}`}>{user?.email}</div>
        <div className={`${styles.cell} ${styles.tags}`}>
            {user?.departmentTags.slice(0, 1).map(tag => <TagItem item={tag} editMode={false}/>)}
        </div>
        <div className={`${styles.cell}`}>
            <a onClick={handleClick}><img src="/img/icons/dots.svg" alt=''/></a>
            <nav ref={dropdownRefItem} className={cx(styles.dropDown, { [styles.dropDownActive]: isActiveItem})}>
                <div className={styles.option}><a onClick={handleEditClick}>Редактировать</a></div>
                <div className={styles.option}><a onClick={handleDeleteClick}>Удалить</a></div>
            </nav>
        </div>
    </div>
  )
}

