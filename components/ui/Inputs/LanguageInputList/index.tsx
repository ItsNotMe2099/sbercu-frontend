import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import PlusSvg from "components/svg/PlusSvg";
import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import Input from "components/ui/Inputs/Input";

import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import SelectInput from 'components/ui/Inputs/SelectInput'
import {LanguagesList} from 'utils/languages'
import {capitalizeFirstLetter} from 'utils/formatters'
import Basket from 'components/svg/Basket'

interface Props {
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  changeWithValue?: boolean
  allowCustomInput?: boolean,
  restrictedValues: any[],
  input?: any,
  meta?: any,
  label?: string,
  labelType?: any,

}

const LanguageInputList = (props: Props) => {
  const { meta: { error, touched },restrictedValues, input, onOpenDropDown, label, ...rest } = props;
  const [items, setItems] = useState(input.value ? input.value : []);

  useEffect(() => {
    console.log("OnChangePresenters", items.filter(item => !!item))
    input.onChange(items.filter(item => !!item))
  }, [items])
  const handleChangeInput = (value, index) => {
    console.log("change", value, index)
    setItems(items => items.map((item, key) => key === index ? value : item))
  }
  const options = Object.keys(LanguagesList).map(key => ({value: key, label: capitalizeFirstLetter(LanguagesList[key]) as string}))

  const handleAdd = () => {
    setItems(items => [...items, '']);
  }
  const handleRemove = (val) => {
    setItems(items => items.filter(i => i !== val));
  }
  return (

      <div className={styles.root}>
        {items.map((val, index) =><div className={styles.field}><div className={styles.input}><SelectInput className={styles.select} inputClassName={styles.select} meta={props.meta} input={{value: val, onChange: (val) => handleChangeInput(val,index)}} placeholder={label}  options={options}/></div>
        <div className={styles.remove} onClick={() => handleRemove(val)}><Basket/></div>
        </div>)}
        <div className={styles.addButton} onClick={handleAdd} style={{...(items.length > 0 ? {marginTop: '18px'}: {})}}><PlusSvg/>Добавить язык</div>
        <ErrorInput {...props.meta}/>
    </div>

  );
};

LanguageInputList.defaultProps = {
  labelType: 'placeholder',
  onSearchChange: () => {},
  onOpenDropDown: () => {},
  restrictedValues: []
}
export default LanguageInputList
