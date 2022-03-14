import Modal from 'components/ui/Modal'
import {ICatalogEntry, IRootState, UserOnBoardingStatus} from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from "react";
import Button from 'components/ui/Button'
import * as React from 'react'
import {modalClose} from 'components/Modal/actions'
import {useTour} from '@reactour/tour'
import request from 'utils/request'


interface Props {
  file?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function WelcomeModal(props: Props){
  const dispatch = useDispatch()
  const { setIsOpen } = useTour()
  const mediaLink = useSelector((state: IRootState) => state.mediaLink.currentMediaLink)
  const hasIframe = ['audio', 'video'].includes(props.file?.media.type);
  useEffect(() => {
  }, []);
  const handleSubmit = () => {
    dispatch(modalClose());
    setIsOpen(true);
  }
  const handleCancel = async () => {
    dispatch(modalClose());
    const res = await request({
      url: `/api/user/onboarding-status`,
      method: 'PUT',
      data: {
        status: UserOnBoardingStatus.Skipped
      }
    });
  }

  return (
    <Modal {...props}>
    <div className={styles.root}>
      <img src={'/img/onboarding/welcome.svg'}/>
      <div className={styles.title}>Добро пожаловать<br/> в новую медиатеку</div>
      <div className={styles.buttons}>
        <Button green size="9px 16px" onClick={handleSubmit}>Изучить интерфейс</Button>
        <Button transparent textLightGrey onClick={handleCancel}>Отмена</Button>
      </div>
    </div>
    </Modal>
  )
}
