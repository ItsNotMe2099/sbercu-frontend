import Button from "components/ui/Button";
import Profile from "./components/profile";
import styles from './index.module.scss'

export default function Header(props){
  return (
    <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.media}>media.</div>
          <form action='/search'>
            <div className={styles.inputContainer}>
              <input className={styles.search}
                     name="query"
                     type='text'
              />
              <Button search></Button>
            </div>
          </form>
          <Profile/>
        </div>
    </div>
  )
}
