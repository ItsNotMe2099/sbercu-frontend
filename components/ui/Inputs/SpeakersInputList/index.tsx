import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import PlusSvg from "components/svg/PlusSvg";
import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import Input from "components/ui/Inputs/Input";

import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import InputCatalogSpeakers from 'components/ui/Inputs/InputCatalogSpeakers'
import Basket from 'components/svg/Basket'

interface Props {
  options: [{ value: string, label: string }],
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

const SpeakersInputList = (props: Props) => {
  const { meta: { error, touched },restrictedValues, input, options, onOpenDropDown, label, ...rest } = props;
  const [items, setItems] = useState(input.value ? input.value : []);

  useEffect(() => {
    console.log("OnChangePresenters", items.filter(item => !!item))
    input.onChange(items.filter(item => !!item))
  }, [items])
  const handleChangeInput = (e, index) => {
    const value = e;
    console.log("change", value, index)
    setItems(items => items.map((item, key) => key === index ? value : item))
  }


  const handleAdd = () => {
    setItems(items => [...items, '']);
  }
  const handleRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }
  return (

      <div className={styles.root}>
        {items.map((val, index) =>

          <div className={styles.item}>
            <InputCatalogSpeakers autoFocus={true} meta={props.meta} input={{value: val, onChange: (val) => handleChangeInput(val,index)}} label={label} />
          <div className={styles.remove} onClick={() => handleRemove(index)}><Basket/></div>
          </div>)}
        <div className={styles.addButton} onClick={handleAdd} style={{...(items.length > 0 ? {marginTop: '18px'}: {})}}><PlusSvg/>Добавить спикера</div>
        <ErrorInput  meta={props.meta}/>
    </div>

  );
};

SpeakersInputList.defaultProps = {
  labelType: 'placeholder',
  onSearchChange: () => {},
  onOpenDropDown: () => {},
  restrictedValues: []
}
export default SpeakersInputList
