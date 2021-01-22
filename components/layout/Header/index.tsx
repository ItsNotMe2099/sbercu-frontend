import ModalConfirm from "components/Modal/ModalConfirm";
import Button from "components/ui/Button";
import InputSearch from "components/ui/Inputs/InputSearch";
import Profile from "./components/profile";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import { createFolderOpen, modalClose, tagCategoryModalOpen, tagModalOpen } from "components/Modal/actions";
import Link from 'next/link'
import { useState } from "react";
interface Props{
  children?: any,
    searchValue?: string,
    showSearch?: boolean
}

export default function Header(props: Props){

  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const [isActive, setIsActive] = useState(false)
  return (
    <div className={styles.root}>
        <div className={styles.container}>
            <Link href={'/'}><a className={styles.media}>media.</a></Link>
          <div className={styles.notMedia}>
              {props.showSearch && <InputSearch onClick={() => isActive ? setIsActive(false) : setIsActive(true)} searchValue={props.searchValue}/>}
          {!isActive ?
          <div className={styles.mobile}>{props.children}</div>
          :null}
          <div className={styles.notMobile}>{props.children}</div>
          <Profile/>
          </div>
        </div>
        <ModalConfirm isOpen={key === 'confirm'}  onRequestClose={() => dispatch(modalClose())}/>
    </div>
  )
}
Header.defaultProps = {
    showSearch: true
}
