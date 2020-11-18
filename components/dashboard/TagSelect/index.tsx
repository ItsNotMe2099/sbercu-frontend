import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './index.module.scss'
import cx from 'classnames'
import { IRootState } from "types";
import { fetchTag } from "./actions";

export const TagSelect = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive);
    //dispatch(fetchTag())
    console.log("Click");
  }
  //const options = useSelector((state: IRootState) => state.CategoryTagReducer.tags)
  const options = [{label: 'test1', value: 1}, {label: 'test2', value: 2}]
  const [value, setValue] = useState(options.find(item => item.value));

  const handleOptionClick = (e, item) => {
    e.preventDefault()
    console.log("SetTag", item.value);
    setValue(item);
    setIsActive(false);
  }
  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <a onClick={onClick} className={styles.dropDownTrigger}>Подразделения</a>
        <a onClick={onClick} className={styles.dropDownTrigger}>Разделы</a>
        <a onClick={onClick} className={styles.dropDownTrigger}>Темы</a>
        <a onClick={onClick} className={styles.dropDownTrigger}>Обязательность</a>
        <a onClick={onClick} className={styles.dropDownTrigger}>Форма обучения</a>
        <a onClick={onClick} className={styles.dropDownTrigger}>Компетенции</a>
        <a onClick={onClick} className={styles.dropDownTrigger}>Уровень менеджмента</a>
      <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <ul>
          {value &&
          <li className={styles.dropdownItem}><a href="" onClick={handleActiveOptionClick}>
            <span className={styles.dropdownItemLabel}>{value.label}</span></a></li>
          }
          {options.filter(item => !value || item.value != value.value).map(item => (
            <li className={styles.dropdownItem}
            >
              <a href="" onClick={(e) => handleOptionClick(e, item)}>
                <span className={styles.dropdownItemLabel}>{item.label}</span>
              </a>
            </li>
          ))}

        </ul>
      </nav>
      </div>
    </div>
  );
};
