import ModalConfirm from "components/Modal/ModalConfirm";
import InputCatalogSearch from "components/ui/Inputs/InputCatalogSearch";
import Profile from "./components/profile";
import styles from './index.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {IHeaderType, IRootState, IUser, UserOnBoardingStatus} from "types";
import {modalClose, welcomeOpen} from "components/Modal/actions";
import Link from 'next/link'
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import InputSpeakerSearch from 'components/ui/Inputs/InputSpeakerSearch'
import WelcomeModal from 'components/onboarding/WelcomeModal'
import useMobileDetect from 'utils/useMobileDetect'
import {useTour} from '@reactour/tour'
import Cookies from 'js-cookie'
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
  const tour = useTour();
  const {isMobile} = useMobileDetect();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    const cookieOnBoarding =  Cookies.get('onBoardingStatus')
    if(user && user.onBoardingStatus === UserOnBoardingStatus.NotShown && !tour.isOpen ){
      dispatch(welcomeOpen())
    }
  }, [])
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
          {user && showSearch && renderSearch()}
          {!isActive && isMobile() ?
            <div className={styles.mobile}>{children}</div>
            : null}
          <div className={styles.notMobile} data-tut={'reactour__state'}>{children}</div>

          {user && <Profile user={user} showSearch={isActive}/>}
        </div>
      </div>
      <ModalConfirm isOpen={key === 'confirm'} onRequestClose={() => dispatch(modalClose())}/>
      {key === 'welcome' && <WelcomeModal isOpen={true} onRequestClose={() => dispatch(modalClose())}/>}
    </div>
  )
}
Header.defaultProps = {
  showSearch: true,
  type: IHeaderType.Catalog
}
