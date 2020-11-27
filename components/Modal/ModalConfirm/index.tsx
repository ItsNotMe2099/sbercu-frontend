import { modalClose } from "components/Modal/actions";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import * as React from "react";
import { IRootState } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean
  onRequestClose: () => void,

}

export default function ModalConfirm(props: Props) {
  const dispatch = useDispatch();
  const data = useSelector((state: IRootState) => state.ModalReducer.confirmData)

  const handleCancel = () => {
    if(data.onCancel){
      data.onCancel()
    }else{
      dispatch(modalClose());
    }
  }
  return (
    <Modal
      {...props}
        title={data.title || 'Вы уверены?'}
    >
      {data.description && <div className={styles.description}>{data.description}</div>}
      <div className={styles.buttons}>
        <Button green size="12px 25px" onClick={data.onConfirm}>{data.confirmText || 'Да'}</Button>
        <Button transparent textLightGrey onClick={handleCancel}>{data.cancelText || 'Отмена'}</Button>
      </div>

    </Modal>
  )
}
