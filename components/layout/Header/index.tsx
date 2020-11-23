import Button from "components/ui/Button";
import Profile from "./components/profile";
import styles from './index.module.scss'

interface Props{
  projectPage?: boolean
}

export default function Header(props: Props){
  return (
    <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.media}>media.</div>
          <div className={styles.notMedia}>
          <form className={styles.form} action='/search'>
            <div className={styles.inputContainer}>
              <input className={styles.search}
                     name="query"
                     type='text'
              />
              <Button search></Button>
            </div>
          </form>
          {props.projectPage ?
          <>
          <div className={styles.create}><a><img src="img/icons/createFolder.svg" alt=''/><span>Создать папку</span></a></div>
          <div className={styles.download}><Button vvlarge green visiblePlus><span>Загрузить файл</span></Button></div>
          </>
          :
          null
          }
          <Profile/>
          </div>
        </div>
    </div>
  )
}
