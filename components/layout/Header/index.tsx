import ModalConfirm from "components/Modal/ModalConfirm";
import Button from "components/ui/Button";
import InputSearch from "components/ui/Inputs/InputSearch";
import Profile from "./components/profile";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { createFolderOpen, modalClose, tagCategoryModalOpen, tagModalOpen } from "components/Modal/actions";
import Link from 'next/link'
interface Props{
  projectPage?: boolean
  tagsPage?: boolean
  usersPage?: boolean,
  children?: any,
}

export default function Header(props: Props){

  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  return (
    <div className={styles.root}>
        <div className={styles.container}>
            <Link href={'/'}><a className={styles.media}>media.</a></Link>
          <div className={styles.notMedia}>
          <InputSearch/>
            {props.children}
          <Profile/>
          </div>
        </div>
        <ModalConfirm isOpen={key === 'confirm'}  onRequestClose={() => dispatch(modalClose())}/>
    </div>
  )
}
