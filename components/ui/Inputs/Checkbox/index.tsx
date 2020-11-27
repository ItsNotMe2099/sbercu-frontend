import { useEffect, useState } from "react";
import styles from './index.module.scss'
interface Props {
  value: number,
  isActive: boolean
  label: string,
  className?: string,
  input: {value: any, onChange: (val) => void}
  onChange: (boolean) => void
}
export default function Checkbox(props: Props) {
  const handleClick = () => {
    props.input.onChange(!props.input.value);
  }
  return (
    <div className={`${styles.root} ${props.className || ''}`} onClick={handleClick}>
      {props.input.value ? <img src={'/img/icons/radio-active.svg'} /> : <img src={'/img/icons/radio.svg'} />}
      <div className={styles.label}>{props.label}</div>
    </div>
  )
}
