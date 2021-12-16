import {getAuthServerSide} from "utils/auth";
import Dashboard from "./dashboard";
import styles from './index.module.scss'

const Home = (props) => {
  return (
    <>
      <Dashboard {...props}/>
    </>
  )

}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default Home
