import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './index.module.scss'
import cx from 'classnames'
import { IRootState } from "types";
import { fetchTag } from "./actions";

interface Props {
}

export const TagSelect = (props: Props) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [selected, setSelected] = useState([])
  const [selectedCat, setSelectedCat] = useState([])
  const onClick = (e/*, item*/) => { 
    e.preventDefault()
    setIsActive(!isActive);
   /*setSelectedCat((selectedCat) => {
      if(selectedCat.includes(item.value)){
        const newSelectedCat = selectedCat.filter(el => el === item.value)
        console.log(newSelectedCat)
        return newSelectedCat
      }
      else{
        return [...selectedCat, item.value]
      }
    })*/
    //dispatch(fetchTag())
    console.log("Click");
  }
  //const options = useSelector((state: IRootState) => state.CategoryTagReducer.tags)
  const options = [{label: 'Системное мышление и решение проблем', value: 1}, {label: 'Клиентоцентричность', value: 2}, {label: 'Развитие команд и сотрудничество', value: 3}, {label: 'Продукты и рынки', value: 4}, {label: 'Клиентоцентричность', value: 5}, {label: 'Клиентоцентричность', value: 6}, {label: 'Клиентоцентричность', value: 7}, {label: 'Клиентоцентричность', value: 8}]
  const categories =[{label: 'Подразделения', value: 1}, {label: 'Разделы', value: 2}, {label: 'Темы', value: 3}, {label: 'Обязательность', value: 4}, {label: 'Форма обучения', value: 5}, {label: 'Компетенции', value: 6}, {label: 'Уровень менеджмента', value: 7}]
  const [value, setValue] = useState(options.find(item => item.value));

  const handleActiveOptionClick = (e, item) => {
    e.preventDefault();
    console.log("Click");
    setSelected((selected) => {
        return [...selected, item]
      }
    )
  }

    const handleDelete =(e, item) => {
      e.preventDefault();
      setSelected((selected) => {
        if(selected.find(el => el.value === item.value)){
        const newSelected = selected.filter(el => el.value !== item.value)
        console.log(newSelected)
        return newSelected
      }
      })}

  return (
    <>
    <div className={styles.root}>
        {categories.map(item => (<a href="#" onClick={onClick} className={styles.dropDownTrigger}>{item.label}</a>))}
        <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
            {value &&
            options.map(item => (<a className={cx(styles.dropdownItem, { [styles.choosed]: selected.find(el => el.value === item.value) })} onClick={(e) => handleActiveOptionClick(e, item)}>
              {selected.find(el => el.value === item.value) ? <a className={styles.delete} onClick={(e) => handleDelete(e, item)}><img src="img/icons/delete.svg" alt=''/></a>: null}<span className={styles.dropdownItemLabel}>{item.label}</span></a>))}
        </nav>
    </div>
    {
      selected.length !== 0 ?
      <div className={styles.filtered}>
        {selected.map(item => (<a className={styles.choosed}>
          <a className={styles.delete} onClick={(e) => handleDelete(e, item)}><img src="img/icons/delete.svg" alt=''/></a><span className={styles.dropdownItemLabel}>{item.label}</span></a>))}
      </div>
      :
      null
    }
    </>
  );
};
