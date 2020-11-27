import ModalConfirm from "components/Modal/ModalConfirm";
import Button from "components/ui/Button";
import InputSearch from "components/ui/Inputs/InputSearch";
import Profile from "./components/profile";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import CreateFolder from "./components/CreateFolder";
import { createFolderOpen, modalClose, tagCategoryModalOpen, tagModalOpen } from "components/Modal/actions";

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
          <div className={styles.media}>media.</div>
          <div className={styles.notMedia}>
          <InputSearch/>
            {props.children}
          <Profile/>
          </div>
        </div>
        <CreateFolder isOpen={key === 'createFolder'}
        onRequestClose={() => dispatch(modalClose())}/>
        <ModalConfirm isOpen={key === 'confirm'}  onRequestClose={() => dispatch(modalClose())}/>
    </div>
  )
}
