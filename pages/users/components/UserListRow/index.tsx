import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import TagItem from "components/tags/TagCategory/TagItem";
import ButtonDots from "components/ui/ButtonDots";
import { format } from "date-fns";
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
    const getUserRoleName = (role) => {
        switch (role) {
            case 'admin':
                return 'Администратор';
            case  'manager':
                return 'Менеджер';
            case 'user':
                return 'Полльзователь';
            case  'limited_user':
                return 'Пользователь (Только свое подразделение)';
            case  'guest':
                return 'Гость';
        }
    }
  return (
    <>
    <div className={styles.root}>
        <div className={`${styles.cell}`}>{user?.lastName} {user?.firstName} <div className={styles.role}>{getUserRoleName(user?.role)}</div></div>
      <div className={`${styles.cell} ${styles.status} ${user?.inviteSent ? styles.statusInviteSent : user?.registeredAt ? styles.statusRegistered : ''}`}>{user?.inviteSent ? 'Приглашение отправлено' : user?.registeredAt ? 'Зарегистрирован' : 'Не зарегистрирован'}
          {user?.registeredAt && <div className={styles.registeredAt}>{format(new Date(user?.registeredAt), 'dd.MM.yyy HH:mm')}</div>}
      </div>
      <div className={`${styles.cell}`}>{user?.virtualSchoolLogin}</div>
      <div className={`${styles.cell}`}>{user?.email}</div>
        <div className={`${styles.cell} ${styles.tags}`}>
            {user?.departmentTags.slice(0, 1).map(tag => <TagItem item={tag} editMode={false}/>)}
        </div>
        <div className={`${styles.cell} ${styles.editCell}`}>
            <ButtonDots onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} showDelete={true} showEdit={true}/>
        </div>
    </div>
    <div className={styles.root__mobile}>
      <div className={styles.row}>
        <div className={styles.name}>{user?.lastName} {user?.firstName}</div>
        <div className={`${styles.editCell}`}>
            <ButtonDots onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} showDelete={true} showEdit={true}/>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.text}>{user?.virtualSchoolLogin}</div>
        <div className={styles.greyText}>Логин ВШ</div>
      </div>
      <div className={styles.row}>
        <div className={styles.text}>{user?.email}</div>
        <div className={styles.greyText}>Почта</div>
      </div>
      <div className={styles.row}>
        <div className={styles.text}>{getUserRoleName(user?.role)}</div>
        <div className={styles.greyText}>Роль</div>
      </div>
      <div className={styles.row}>
      <div className={`${styles.status} ${styles.status} ${user?.inviteSent ? styles.statusInviteSent : user?.registeredAt ? styles.statusRegistered : ''}`}>{user?.inviteSent ? 'Приглашение отправлено' : user?.registeredAt ? 'Зарегистрирован' : 'Не зарегистрирован'}</div>
      </div>
    </div>
    </>
  )
}

