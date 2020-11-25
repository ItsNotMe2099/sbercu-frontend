import Button from "components/ui/Button";
import InputSearch from "components/ui/Inputs/InputSearch";
import Profile from "./components/profile";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import CreateFolder from "./components/CreateFolder";
import { createFolderOpen, modalClose } from "components/Modal/actions";

interface Props{
  projectPage?: boolean
  tagsPage?: boolean
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
          {props.projectPage ?
          <>
          <div className={styles.create}><Button folder transparent textDarkGrey btnDarkGrey type="button" onClick={() => dispatch(createFolderOpen())}>Создать папку</Button></div>
          <div className={styles.download}><Button size='8px 16px' green visiblePlus btnWhite type="button"><span>Загрузить файл</span></Button></div>
          </>
          :
          null
          }
          {props.tagsPage ?
          <>
          <div className={styles.tagBtn}><Button transparent visiblePlus textGreen btnGreen type="button">Создать новый тег</Button></div>
          <div className={styles.tagBtn}><Button transparent visiblePlus textGreen btnGreen type="button">Создать новую коллекцию</Button></div>
          </>
          :
          null
          }
          <Profile/>
          </div>
        </div>
        <CreateFolder isOpen={key === 'createFolder'}
        onRequestClose={() => dispatch(modalClose())}/>
    </div>
  )
}
