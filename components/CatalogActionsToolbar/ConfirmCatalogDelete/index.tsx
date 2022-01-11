import {CatalogSortField, SortOrder} from "types";
import styles from './index.module.scss'
import SortArrow from 'components/svg/SortArrow'
import Button from 'components/ui/Button'
import Basket from 'components/svg/Basket'
import * as React from 'react'
import Modal from 'components/ui/Modal'


interface Props {
 onConfirm: () => void,
  onCancel: () => void

}
export default function ConfirmCatalogDelete(props: Props){
  const {onConfirm, onCancel} = props;

  return (
   <div className={styles.root}>
     <div className={styles.title}>Вы уверены, что хотите удалить выбранные обьекты?</div>
     <div className={styles.buttons}>
       <Button red size="9px 16px" onClick={onConfirm}>Удалить</Button>
       <Button transparent textLightGrey onClick={onCancel}>Отмена</Button>
     </div>
   </div>
  )
}
