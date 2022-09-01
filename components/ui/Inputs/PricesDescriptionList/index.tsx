import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import PlusSvg from "components/svg/PlusSvg";
import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import Input from "components/ui/Inputs/Input";

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import SelectInput from 'components/ui/Inputs/SelectInput'
import {LanguagesList} from 'utils/languages'
import {capitalizeFirstLetter} from 'utils/formatters'
import Basket from 'components/svg/Basket'
import {required, speakerPriceFieldRequired} from "utils/validations";
import {SpeakerPriceCurrencyList} from "types";

interface Props {

  input?: any,
  meta?: any,
  label?: string,
  labelType?: any,
  nameOptions: {label: string, value: string}[]
}

const PricesDescriptionList = (props: Props) => {
  const { meta: { error, touched }, input, label, ...rest } = props;
  const [items, setItems] = useState(input.value ? input.value : []);

  useEffect(() => {
     input.onChange(items.filter(item => !!item))
  }, [items])
  const handleChangeName = (name: string, index) => {
    setItems(items => items.map((item, key) => key === index ? {...item, name} : item))
  }
  const handleChangePrice = (price: string, index) => {
    console.log("HandleChangePrice", price)
    setItems(items => items.map((item, key) => key === index ? {...item, price} : item))
  }
  const handleChangeCurrency = (currency: string, index) => {
    setItems(items => items.map((item, key) => key === index ? {...item, currency} : item))
  }

  const handleAdd = () => {
    setItems(items => [...items, {name: null, price: null, currency: 'RUB'}]);
  }
  const handleRemove = (val) => {

    setItems(items => items.filter(i => !(i.name === val.name && i.price === val.price && i.currency === val.currency)));
  }

  return (

      <div className={styles.root}>
        {props.label && <div className={styles.label}>{props.label}</div>}
        {items.map((val, index) =><div className={styles.field}>
          <div className={cx(styles.input, styles.name)}>
            <SelectInput className={styles.select} placeholder={'Услуга'} inputClassName={styles.select} meta={{}}  input={{value: val.name, onChange: (val) => handleChangeName(val,index)}}  options={props.nameOptions}/>
          </div>
          <div className={cx(styles.input, styles.price)}>

            <Input className={styles.priceField} type={'number'} meta={{}}  input={{value: val.price, onChange: (e) => handleChangePrice(e?.currentTarget?.value,index)}} placeholder={'Цена'}/>
          </div>
          <div className={cx(styles.input, styles.currency)}>
            <SelectInput className={styles.select} inputClassName={styles.select} meta={{}} input={{value: val.currency, onChange: (val) => handleChangeCurrency(val,index)}} placeholder={label}  options={SpeakerPriceCurrencyList}/>
          </div>
        <div className={styles.remove} onClick={() => handleRemove(val)}><Basket/></div>
        </div>)}
        <div className={styles.addButton} onClick={handleAdd} style={{...(items.length > 0 ? {marginTop: '18px'}: {})}}><PlusSvg/>Добавить услугу</div>
        <ErrorInput meta={props.meta}/>
    </div>

  );
};

PricesDescriptionList.defaultProps = {
  labelType: 'placeholder',
}
export default PricesDescriptionList
