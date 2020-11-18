import Button from "components/ui/Button";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Welcome from 'components/svg/Welcome'
import { TagSelect } from "components/dashboard/TagSelect";

export default function Dashboard(props){
  return (
    <>
      <TagSelect/>
    </>
  )
}


