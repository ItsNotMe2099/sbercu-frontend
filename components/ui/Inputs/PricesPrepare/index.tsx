import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import PlusSvg from "components/svg/PlusSvg";
import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import Input from "components/ui/Inputs/Input";

import {Field, formValueSelector, reduxForm} from 'redux-form'
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import SelectInput from 'components/ui/Inputs/SelectInput'
import {LanguagesList} from 'utils/languages'
import {capitalizeFirstLetter} from 'utils/formatters'
import Basket from 'components/svg/Basket'
import {required, speakerPriceFieldRequired} from "utils/validations";
import {SpeakerPriceCurrencyList, SpeakerPricePrepareTypeList, SpeakerPriceTypeList} from "types";

interface Props {
  label?: string,
}

const PricesPrepare = (props: Props) => {


  return (

      <div className={styles.root}>
        {props.label && <div className={styles.label}>{props.label}</div>}
        <div className={styles.field}>
          <div className={cx(styles.input, styles.name)}>
            <div className={styles.selectName}>
              Услуга по подготовке
            </div>
           </div>
          <div className={cx(styles.input, styles.price)}>
            <Field
                className={styles.priceField}
                name="preparePrice"
                placeholder={'Цена'}
                type={'number'}
                component={Input}
            />
          </div>
          <div className={cx(styles.input, styles.currency)}>
            <Field
                className={styles.select}
                inputClassName={styles.select}
                name="prepareCurrency"
                component={SelectInput}
                options={SpeakerPriceCurrencyList}
            />
          </div>
        </div>
    </div>

  );
};

PricesPrepare.defaultProps = {
  labelType: 'placeholder',
}
export default PricesPrepare
