import styles from './index.module.scss'
import Arrow from 'components/svg/Arrow'
import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick';
import { useRef, useState } from 'react';
import cx from 'classnames'

interface Props {
  children?: React.ReactNode
  size?: string
  minWidth?: string
  options: any[]
  value: any
  onChange: (value) => void
}

export default function QualitySelect(props: Props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const onClick = (e) => {
        e.preventDefault()
        setIsActive(!isActive);
    }
    const handleChange = (value) => {
      props.onChange(value)

    }
  return (
    <div
      onClick={onClick}
      className={cx(styles.root, { [styles.isActive]: isActive})}
      style={{padding: props.size}}

    >
    <span className={styles.activeOption}>{props.options.find((i) => i.value === props.value)?.label}</span>
    <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })} style={{minWidth: props.minWidth}}>
      {props.options.map(item =>
        <div className={styles.option} onClick={() => handleChange(item)}>{item.label}</div>
        )}
    </nav>
    </div>
  )
}
