import NewPWForm from "components/auth/password-reset/components/NewPWFormSection/NewPWForm";
import Header from "components/layout/Header";
import WelcomePage from "pages/welcome";
import { withAuthSync } from "utils/auth";
import Dashboard from "./dashboard";
import styles from './index.module.scss'

const Home = () => {
  return (
    <>
      <div className={styles.root}>
          <Dashboard/>
      </div>
    </>
  )

}
export default withAuthSync(Home)
