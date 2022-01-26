import { useEffect, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import Mark from 'components/svg/Mark'

interface Props {
  isChecked: boolean,
  onChange: (checked) => void
}
export default function SelectCheckbox(props: Props) {
  const {isChecked, onChange} = props;
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onChange(!isChecked);
  }
  return (
    <div className={cx(styles.root, {[styles.checked]: isChecked})} onClick={handleClick}><Mark isChecked={isChecked}/></div>
  )
}
