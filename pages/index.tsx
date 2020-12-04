import ProjectLoader from "components/ContentLoaders/projectLoader";
import { withAuthSync } from "utils/auth";
import Dashboard from "./dashboard";
import styles from './index.module.scss'

const Home = () => {
  return (
    <>
      <Dashboard/>
    </>
  )

}
export default withAuthSync(Home)
