import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import ErrorInput from "components/ui/Inputs/components/ErrorInput";

import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'

interface Props {
  options: { value: string, label: string }[],
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  changeWithValue?: boolean
  allowCustomInput?: boolean,
  restrictedValues: any[],
  className?: string
  inputClassName?: string
  input?: any,
  meta?: any,
  label?: string,
  labelType?: any,
  placeholder?: string

}

const SelectInput = (props: Props) => {
  const { meta: { error, touched },restrictedValues, input, options, onOpenDropDown, className, inputClassName, label, placeholder, ...rest } = props;
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const valueInputRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [currentLabel, setCurrentLabel] = useState('');
  console.log("SelectValue", restrictedValues);
  const onClick = (e) => {
    e.preventDefault()
    if (!isActive && onOpenDropDown) {
      onOpenDropDown();
    }

    if (!isActive) {
      setTimeout(() => {
        console.log("SETFocus", searchInputRef.current)
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100)
    }
    setIsActive(!isActive);
  }

  const handleOptionClick = (e, item) => {
    e.preventDefault()

    if(props.changeWithValue){
      input.onChange(item);
    }else {
      input.onChange(item.value);
    }
    setIsActive(false);
    console.log("setValue", item.value)
    if (searchInputRef && searchInputRef?.current) {

      searchInputRef.current.value = '';
    }

  }
  useEffect(() => {
    if(!input){
      return;
    }
    if(props.allowCustomInput){
      setCurrentLabel(props.changeWithValue ? input.value.label :  input.value )
    }else {
      setCurrentLabel(props.options.find(item => props.changeWithValue ? input.value.value === item.value : input.value === item.value)?.label)
    }
    }, [input, options])

  const handleActiveOptionClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  }
  return (

      <div className={cx(styles.root, className)}>
        {props.label && <label className={styles.label}>{props.label}</label>}
        <div className={cx(styles.rootInput, inputClassName)}>
        <div className={`${styles.inputContainer} ${(error && touched) && styles.error}`} onClick={onClick}>
          {currentLabel ? currentLabel : <span className={styles.placeholder}>{placeholder || ''}</span>}
          <a className={styles.dropDownTrigger}>
            <img src='/img/icons/select-trigger.svg' alt=''/>
          </a>
        </div>
        <div ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive, [styles.dropDownWithLabelCross]: props.labelType === 'cross' })}>
        <ul>
          {options?.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
            <li className={`${styles.dropdownItem} ${(props.changeWithValue ? input.value.value === item.value : input.value === item.value) && styles.dropdownItemActive}`}
            >
              <a href=""
                 onClick={(e) => handleOptionClick(e, item)}
                 className={`${styles.dropdownItemLabel}`}>
                    {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
        </div>
        <ErrorInput {...props.meta}/>
    </div>

  );
};

SelectInput.defaultProps = {
  labelType: 'placeholder',
  onSearchChange: () => {},
  onOpenDropDown: () => {},
  restrictedValues: []
}
export default SelectInput
