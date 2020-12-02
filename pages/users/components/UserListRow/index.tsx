import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import TagItem from "components/tags/TagCategory/TagItem";
import ButtonDots from "components/ui/ButtonDots";
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

    const handleEditClick = () => {
        if(onEditClick){
            onEditClick(user)
        }
    }
    const handleDeleteClick = () => {
        if(onDeleteClick){
            onDeleteClick(user)
        }
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
        <div className={`${styles.cell} ${styles.editCell}`}>
            <ButtonDots onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>
        </div>
    </div>
  )
}

