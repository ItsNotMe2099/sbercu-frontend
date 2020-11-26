import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import TagCategory from "components/tags/TagCategory";
import InputSearch from "components/ui/Inputs/InputSearch";



export default function Users(props){

  const users = [{
  name: "Константин Констнтинович Константинопольский", 
  status: "Приглашение отправлено", 
  login: "konstantinopolsky_di" , 
  email: "pushkin.d.i@sberbank.ru",
  subdivision: "Администратор"
},
{
  name: "Константин Констнтинович Константинопольский", 
  status: "Зарегистрирован", 
  login: "konstantinopolsky_di" , 
  email: "pushkin.d.i@sberbank.ru",
  subdivision: "Школа риск-менеджмента"
}]
  
  return (
    <body className={styles.white}>
    <Header usersPage/>
    <div className={styles.root}>
      <div className={styles.title}>Пользователи</div>
      <div className={styles.container}>
        <TagCategory green/>
      </div>
      <div className={styles.inputContainer}>
        <InputSearch placeholder="Введите ФИО, логин или почту пользователя"/>
      </div>
      <div className={styles.table}>
        <div className={styles.tr}>
          <div className={styles.td}>ФИО</div>
          <div className={styles.td}>Статус</div>
          <div className={styles.td}>Логин ВШ</div>
          <div className={styles.td}>Почта</div>
          <div className={styles.td}>Подразделение</div>
        </div>
      <div className={styles.tr}>
        {users.map(item => {
          <>
          <div className={styles.td}>{item.name}</div>
          <div className={styles.td}>{item.status}</div>
          <div className={styles.td}>{item.login}</div>
          <div className={styles.td}>{item.email}</div>
          <div className={styles.td}>{item.subdivision}</div>
          </>
        }
        )
        }
      </div>
    </div>
    </div>
    </body>
  )
}

