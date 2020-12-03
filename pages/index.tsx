import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import { withAuthSync } from "utils/auth";
import Dashboard from "./dashboard";
import styles from './index.module.scss'

const Home = () => {
  return (
    <>
      <Dashboard/>
      <DashboardLoader/>
    </>
  )

}
export default withAuthSync(Home)
