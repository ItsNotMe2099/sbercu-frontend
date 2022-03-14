import {CatalogSortField, IRootState, SortOrder} from "types";
import styles from './index.module.scss'
import SortArrow from 'components/svg/SortArrow'
import Button from 'components/ui/Button'
import Basket from 'components/svg/Basket'
import * as React from 'react'
import {useState} from 'react'
import ConfirmCatalogDelete from 'components/CatalogActionsToolbar/ConfirmCatalogDelete'
import { useDispatch, useSelector } from 'react-redux'
import {catalogCopy, deleteManyCatalog} from 'components/catalog/actions'

interface Props {
  selectedIds?: number[],
  onUnSelectAll?: () => void
}
export default function CatalogActionsToolbar(props: Props){
  const {selectedIds, onUnSelectAll} = props;
  const items = useSelector((state: IRootState) => state.catalog.list)
  const dispatch = useDispatch();
  const [showConfirm ,setShowConfirm] = useState(false);
  const handleUnSelectAll = () => {
    onUnSelectAll();
  }
  const handleDelete = () => {
    dispatch(deleteManyCatalog(selectedIds));
    onUnSelectAll();
  }
  const handleCut = () => {
    dispatch(catalogCopy(selectedIds.map(i => items.find(a => a.id === i))));
    onUnSelectAll();
  }
  return (
   <div className={styles.root}>
     <Button  transparent textDarkGrey  size="9px 20px"   onClick={handleUnSelectAll}>Отменить выделение</Button>

     <Button  transparent textDarkGrey  size="9px 20px"   onClick={handleCut}>Вырезать</Button>

     <Button  transparent  size="9px 20px"  className={styles.buttonDelete}  onClick={() => setShowConfirm(true)}><Basket/><span className={styles.cleanBasketTitle}>Удалить</span></Button>
     {showConfirm && <ConfirmCatalogDelete onCancel={() => setShowConfirm(false)} onConfirm={handleDelete}/>}
   </div>
  )
}
