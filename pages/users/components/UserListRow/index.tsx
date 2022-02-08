import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import TagItem from "components/tags/TagCategory/TagItem";
import ButtonDots from "components/ui/ButtonDots";
import { format } from "date-fns";
import { useRef } from "react";
import {FileActionType, IUser} from "types";
import styles from './index.module.scss'
import cx from 'classnames'
interface Props {
  user: IUser
  onEditClick?: (item: IUser) => void
  onDeleteClick?: (item: IUser) => void
}

export default function UserListRow({user, onEditClick, onDeleteClick}: Props){
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
  const actions = (() => {
    let actions = [
      {name: 'Редактировать', key: FileActionType.Edit},
      {name: 'Удалить ', key: FileActionType.Delete},
    ];

    return actions;

  })()

  const handleActionClick = (action: FileActionType) => {
    switch (action) {
      case FileActionType.Edit:
        if(onEditClick){
          onEditClick(user)
        }
        break;
      case FileActionType.Delete:
        if(onDeleteClick){
          onDeleteClick(user)
        }
        break;
    }
  }
  return (
    <>
    <div className={styles.root}>
      <div className={`${cx(styles.cell, styles.cellUser)}`}><div className={styles.inner}><div>{user?.lastName} {user?.firstName}</div> <div className={styles.role}>{getUserRoleName(user?.role)}</div></div></div>
      <div className={`${styles.cell} ${styles.status} ${user?.inviteSent ? styles.statusInviteSent : user?.registeredAt ? styles.statusRegistered : ''}`}>{user?.inviteSent ? 'Приглашение отправлено' : user?.registeredAt ? 'Зарегистрирован' : 'Не зарегистрирован'}
          {user?.registeredAt && <div className={styles.registeredAt}>{format(new Date(user?.registeredAt), 'dd.MM.yyy HH:mm')}</div>}
      </div>
      <div className={`${styles.cell}`}>{user?.virtualSchoolLogin}</div>
      <div className={`${styles.cell}`}>{user?.email}</div>
        <div className={`${styles.cell} ${styles.tags}`}>
            {user?.departmentTags.slice(0, 1).map(tag => <TagItem item={tag} editMode={false}/>)}
        </div>
        <div className={`${styles.cell} ${styles.editCell}`}>
            <ButtonDots  options={actions} onClick={handleActionClick}/>
        </div>
    </div>
    <div className={styles.root__mobile}>
      <div className={styles.row}>
        <div className={styles.name}>{user?.lastName} {user?.firstName}</div>
        <div className={`${styles.editCell}`}>
            <ButtonDots options={actions} onClick={handleActionClick}/>
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

