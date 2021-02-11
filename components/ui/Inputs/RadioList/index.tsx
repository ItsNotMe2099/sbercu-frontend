import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import Radio from "components/ui/Inputs/RadioList/Radio";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'

interface Props {
  options: [{ value: string, label: string }],
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  allowCustomInput?: boolean,
  input: any
  changeWithValue?: boolean
  restrictedValues: any[],
  grid: number
}

export const RadioList = (props) => {
  const { meta: { error, touched },restrictedValues, input, options, label, type, ...rest } = props;

  console.log("radio options", props.options);
  const handleCheckboxChanged = (value) => {
    console.log("OnChange", value);
      input.onChange(value)
  }

  console.log("input.value", input.value)
  return (
    <div className={styles.root} style={{
      display: (props.grid) ? 'grid' : 'block',
      gridTemplateColumns: props.grid ? Array.from({ length: props.grid }, (_, i) => '1fr').join(' ') : '',
      gridGap: '1vw'
    }}>
      {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
        <div className={styles.radio}>
          <Radio
            className={`${!props.grid && styles.radioNoGrid}`}
                     value={item.value} isActive={item.value === input.value} label={item.label} onChange={handleCheckboxChanged}/>
        </div>
      ))}
      <ErrorInput {...props}/>
      </div>

  );
};

RadioList.defaultProps = {
  labelType: 'static',
  restrictedValues: []
}
