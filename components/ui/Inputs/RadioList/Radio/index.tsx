import { useEffect, useState } from "react";
import styles from './index.module.scss'
interface Props {
  value: number,
  isActive: boolean
  label: string,
  className?: string
  onChange: (boolean) => void
}
export default function Radio(props: Props) {
  const [active, setActive] = useState(props.isActive);
  useEffect(() => {
    setActive(props.isActive)
  }, [props.isActive])
  const handleClick = () => {
    props.onChange(props.value);
  }
  return (
    <div className={`${styles.root} ${props.className || ''}`} onClick={handleClick}>
      {props.isActive ? <img src={'/img/icons/radio-active.svg'} /> : <img src={'/img/icons/radio.svg'} />}
      <div className={styles.label}>{props.label}</div>
    </div>
  )
}
