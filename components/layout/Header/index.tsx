import ModalConfirm from "components/Modal/ModalConfirm";
import InputCatalogSearch from "components/ui/Inputs/InputCatalogSearch";
import Profile from "./components/profile";
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {IHeaderType, IRootState, IUser} from "types";
import {createFolderOpen, modalClose, tagCategoryModalOpen, tagModalOpen} from "components/Modal/actions";
import Link from 'next/link'
import {useState} from "react";
import {useRouter} from 'next/router'
import InputSpeakerSearch from 'components/ui/Inputs/InputSpeakerSearch'

interface Props {
  children?: any,
  searchValue?: string,
  showSearch?: boolean
  user?: IUser
  type: IHeaderType
}

export default function Header(props: Props) {
  const {type, showSearch, children, user} = props;
  const dispatch = useDispatch()
  const router = useRouter();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const [isActive, setIsActive] = useState(false)

  const handleLogoClick = (e) => {
    if (router.route === '/') {
      e.preventDefault();
      window.location.reload();
    }
  }
  const handleSpeakerClick = (e) => {
    if (router.route === '/speakers') {
      e.preventDefault();
      window.location.reload();
    }
  }
  const renderSearch = () => {
    switch (type){
      case IHeaderType.Catalog:
        return <InputCatalogSearch onClick={() => isActive ? setIsActive(false) : setIsActive(true)}
                                   searchValue={props.searchValue}/>;
      case IHeaderType.Speaker:
        return <InputSpeakerSearch onClick={() => isActive ? setIsActive(false) : setIsActive(true)}
                                   searchValue={props.searchValue}/>;

    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
        <Link href={'/'}><a className={styles.media} onClick={handleLogoClick}>media.</a></Link>
        {type === IHeaderType.Speaker && <Link href={'/speakers'}><a className={styles.speakers} onClick={handleSpeakerClick}>speakers</a></Link>}
        </div>
        <div className={styles.notMedia}>
          {showSearch && renderSearch()}
          {!isActive ?
            <div className={styles.mobile}>{children}</div>
            : null}
          <div className={styles.notMobile}>{children}</div>

          <Profile user={user} showSearch={isActive}/>
        </div>
      </div>
      <ModalConfirm isOpen={key === 'confirm'} onRequestClose={() => dispatch(modalClose())}/>
    </div>
  )
}
Header.defaultProps = {
  showSearch: true,
  type: IHeaderType.Catalog
}
