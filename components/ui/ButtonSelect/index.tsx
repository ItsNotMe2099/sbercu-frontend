import styles from './index.module.scss'
import Arrow from 'components/svg/Arrow'
import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick';
import { useRef } from 'react';
import cx from 'classnames'

interface Props {
  children?: React.ReactNode
  size?: string
  minWidth?: string
  options: any[],
  onChange: (item) => void
}

export default function ButtonSelect(props: Props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = (e) => {
        e.preventDefault()
        setIsActive(!isActive);
    }
  return (
    <>
    <div
      onClick={onClick}
      className={cx(styles.root, { [styles.isActive]: isActive})}
      style={{padding: props.size}}

    >
    <div className={styles.title}>{props.children}</div>
    <Arrow/>
    <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })} style={{minWidth: props.minWidth}}>
      {props.options.map(item =>
          <a className={styles.option} onClick={() => props.onChange(item)}><span>{item.label}</span> {item.tip && <span className={styles.tip}>{item.tip}</span>}</a>
        )}
    </nav>
    </div>

</>
  )
}
