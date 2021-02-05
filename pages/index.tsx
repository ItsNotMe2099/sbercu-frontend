import { withAuthSync } from "utils/auth";
import Dashboard from "./dashboard";
import styles from './index.module.scss'

const Home = (props) => {
  return (
    <>
      <Dashboard {...props}/>
    </>
  )

}
export default withAuthSync(Home)
