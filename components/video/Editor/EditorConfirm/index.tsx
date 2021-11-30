import { cutVideo } from "components/catalog/actions";
import { modalClose } from "components/Modal/actions";
import Basket from "components/svg/Basket";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import Duration from "components/video/Duration";
import * as React from "react";
import { ICatalogEntry, IRootState, IVideoTrimRange } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean
  cutItems: IVideoTrimRange[],
  video: ICatalogEntry
  duration: number
}

export default function ModalEditorConfirm(props: Props) {
  const dispatch = useDispatch();
  const getTotalCut = () => {
    return props.cutItems.reduce((itemA, itemB) => itemA + itemB.end - itemB.start, 0);
  }
  const getTotalDuration = () => {
    return props.duration - props.cutItems.reduce((itemA, itemB) => itemA + itemB.end - itemB.start, 0);
  }
  const handleCancel = () => {
    dispatch(modalClose());
  }

  const handleSubmit = () => {
    dispatch(cutVideo(props.video.mediaId, props.cutItems));
  }
  return (
    <Modal
      {...props}
      onRequestClose={handleCancel}
        title={'Изменить видео?'}
    >

      <div className={styles.cutItemsTitle}>Вырезанные фрагменты ({props.cutItems.length}):</div>
      <div className={styles.cutItemsWrapper}>
        {props.cutItems.length > 0 && <div className={styles.cutItems}>
          {props.cutItems.map((item, index) => <div key={item.id} className={styles.cutItem}>
            <div className={styles.cutItemNumber}>{index + 1}.</div>
            <div className={styles.cutItemRange}><Duration  className={styles.time} seconds={item.start} showMs={true} /> - <Duration className={styles.time} seconds={item.end} showMs={true}/></div>
            <div className={styles.cutItemDuration}><Duration seconds={item.end - item.start} showMs={true}/></div>
          </div>)}
        </div>}
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <div className={styles.summaryItemLabel}>Вырезано:</div>
          <div className={styles.summaryItemValue}><Duration seconds={getTotalCut()} showMs={true}/></div>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryItemLabel}>Итоговая длительность</div>
          <div className={styles.summaryItemValue}><Duration seconds={getTotalDuration()} showMs={true}/></div>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button green size="12px 25px" onClick={handleSubmit}>Изменить</Button>
        <Button transparent textLightGrey onClick={handleCancel}>Назад</Button>
      </div>
    </Modal>
  )
}
