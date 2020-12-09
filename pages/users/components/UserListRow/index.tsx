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
    <>
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
    <div className={styles.root__mobile}>
      <div className={styles.row}>
        <div className={styles.name}>{user?.lastName} {user?.firstName}</div>
        <div className={`${styles.editCell}`}>
            <ButtonDots onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.text}>{user?.virtualSchoolId}</div>
        <div className={styles.greyText}>ВШ ID</div>
      </div>
      <div className={styles.row}>
        <div className={styles.text}>{user?.email}</div>
        <div className={styles.greyText}>Почта</div>
      </div>
      <div className={styles.row}>
        <div className={styles.text}>{user?.role}</div>
        <div className={styles.greyText}>Роль</div>
      </div>
      <div className={styles.row}>
      <div className={`${styles.status} ${user?.inviteToken ? styles.statusInviteSent : styles.statusRegistered}`}>{user?.inviteToken ? 'Приглашение отправлено' : 'Зарегистрирован'}</div>
      </div>
    </div>
    </>
  )
}

