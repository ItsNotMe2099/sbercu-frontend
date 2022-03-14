import {CatalogSortField, SortOrder} from "types";
import styles from 'components/CatalogSortToolbar/index.module.scss'
import SortArrow from 'components/svg/SortArrow'


interface Props {
  sortField?: CatalogSortField,
  sortOrder?: SortOrder,
  onChange: (sortField, sortOrder) => void,
}
const CatalogSortButton = ({name, field, isActive, sortOrder, onChange}) => {
  const getNextSortOrder = () => {
    if(!sortOrder){
      return SortOrder.Asc
    }else if(sortOrder === SortOrder.Asc){
      return SortOrder.Desc;
    }else if(sortOrder === SortOrder.Desc){
      if(isActive) {
        return null;
      }else {
        return SortOrder.Asc
      }
    }
  }
  const handleChange = () => {
    if(!getNextSortOrder()){
      onChange(null, null);
    }else {
      onChange(field, getNextSortOrder());
    }
  }
  return <div className={styles.button} onClick={handleChange}><div className={styles.name}>{name}</div>{isActive && <div className={styles.order}><SortArrow order={sortOrder}/></div>}</div>
}
export default function CatalogSortToolbar(props: Props){
  const {sortField, sortOrder, onChange} = props;
  const buttons = [
    {name: 'По типу файлов', field: CatalogSortField.Type},
    {name: 'По алфавиту', field: CatalogSortField.Name},
    {name: 'По дате создания', field: CatalogSortField.CreatedAt},
  ]
  return (
   <div className={styles.root} data-tour="catalog-sort">
     {buttons.map(i => <CatalogSortButton onChange={onChange} name={i.name} field={i.field} isActive={sortField === i.field} sortOrder={sortOrder}/>)}
   </div>
  )
}
