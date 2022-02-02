import ErrorInput from "components/ui/Inputs/components/ErrorInput";
import {useEffect, useState} from "react";
import styles from './index.module.scss'
import parsePhoneNumber, {isPossiblePhoneNumber} from 'libphonenumber-js'
import {Metadata} from 'libphonenumber-js/core'
// @ts-ignore
import minMetadata from 'libphonenumber-js/metadata.min'
// @ts-ignore
const metadata = new Metadata(minMetadata)

interface Props {
  meta: any
  input: { value: string, onChange: (val) => void, name: string }
  type: string
  label: string
  disabled?: boolean
  inputLabel?: string,
  onClick: () => void,
  hasAutoComplete?: boolean
  className?: string
  placeholder?: string
}

const codeDoubles = {
  '1': ['CA', 'US'],
  '590': 'FR',
  '47': 'NO',
  '290': 'SH',
  '262': 'RE',
  '44': 'GB',
  '61': 'AU',
}
import Input from 'react-phone-number-input/input'
const codesOptions = Object.keys((metadata as any).metadata.countries).map((key) => {
  const value = (metadata as any).metadata.countries[key];
  return {
    value: key,
    label: `+${value[0]}`,
    phoneCode: value[0].replace(/[^\d]/g, ''),
    code: key,
    sort: parseInt(value[0], 10)
  }
}).sort((a, b) => a.sort < b.sort ? -1 : 1)
  .filter(item => !codeDoubles[item.phoneCode] || (codeDoubles[item.phoneCode] && !Array.isArray(codeDoubles[item.phoneCode]) && codeDoubles[item.phoneCode] === item.value) || (codeDoubles[item.phoneCode] && Array.isArray(codeDoubles[item.phoneCode]) && codeDoubles[item.phoneCode].includes(item.value)))
const findCountryCode = (value) => {
  const cleanValue = value ? value.replace(/[^\d]/g, '') : '';
  const codes = (metadata as any).metadata.country_calling_codes;
  const key = Object.keys(codes).reverse().find(key => cleanValue.indexOf(key) === 0)
  if (key) {
    const val = codeDoubles[key] ? (Array.isArray(codeDoubles[key]) ? codeDoubles[key][0] : codeDoubles[key]) : codes[key][0];
    return {value: val, label: `+${key}`, code: val, sort: 0}
  }
}

export default function InputPhone(props: Props) {
  const {error, touched} = props.meta ? props.meta : {error: null, touched: false}

  const {input: {value, onChange}, type, label} = props

  const handleInputChange = (e) => {
    onChange(e)

  }

  console.log("PhoneValue", value)
  return (
    <div className={`${styles.root} ${props.className && props.className}`}>
      {props.label && <div className={styles.label}>{props.label}</div>}
      <Input
        placeholder={props.placeholder}
        className={styles.input}
        value={!value ? `+7` : value}
        international={true}
        withCountryCallingCode={false}
        onChange={handleInputChange}/>
      <ErrorInput {...props}/>
    </div>


  )
}
