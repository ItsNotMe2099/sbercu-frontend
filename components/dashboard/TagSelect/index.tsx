import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './index.module.scss'
import cx from 'classnames'
import { IRootState } from "types";
import { fetchTag } from "./actions";

interface Props {
  categoryLabel: string
}

export const TagSelect = (props: Props) => {
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
  const options = [{label: 'Системное мышление и решение проблем', value: 1}, {label: 'Клиентоцентричность', value: 2}, {label: 'Развитие команд и сотрудничество', value: 3}, {label: 'Продукты и рынки', value: 4}]
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
        <a href="#" onClick={onClick} className={cx(styles.dropDownTrigger, { [styles.dropdownTriggerActive]: isActive })}>{props.categoryLabel}</a>
        <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
          <div className={styles.options}>
            {value &&
            options.map(item => (
            <div className={styles.dropdownItem}><a href="" onClick={handleActiveOptionClick}>
              <span className={styles.dropdownItemLabel}>{item.label}</span></a>
            </div>))
            }
        </div>
        </nav>
    </div>
  );
};
