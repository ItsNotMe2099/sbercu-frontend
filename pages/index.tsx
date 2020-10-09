import WelcomePage from "pages/welcome";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'

const Home = () => {
  return (
      <div className={styles.root}>
          <WelcomePage/>
      </div>
  )

}
export default withAuthSync(Home)
