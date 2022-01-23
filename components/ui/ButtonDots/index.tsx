import {useDetectOutsideClick} from "components/dashboard/TagSelect/useDetectOutsideClick";
import Dots from "components/svg/Dots";
import {ReactElement, useRef, useState} from "react";
import styles from './index.module.scss'
import cx from 'classnames'

interface IOption {
  name: string,
  key: any
}

interface Props {
  children?: ReactElement
  style?: 'grey' | 'white'
  onClick?: (item) => void,
  options: IOption[]

}

export default function ButtonDots(props: Props) {
  const {style, onClick, options} = props;
  const dropdownRefItem = useRef(null)
  const dotsRef = useRef(null)
  const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);


  const handleClick = (e) => {
    e.preventDefault()
    const params = dotsRef.current?.getBoundingClientRect();
    if (params) {
      const offset = params.x + params.width;
      if (offset - dropdownRefItem.current?.offsetWidth < 20) {
        dropdownRefItem.current.style.right = `-${dropdownRefItem.current?.offsetWidth - params.width}px`
      }
    }
    setIsActiveItem(!isActiveItem);


  }
  const handleClickItem = (e, action) => {
    e.preventDefault();
    if(onClick){
      onClick(action);
    }
    setIsActiveItem(false);
  }


  return (
    <div className={cx(styles.root, {})}>
      <div
        ref={dotsRef}
        onClick={handleClick}
        className={cx(styles.button, {
          [styles.buttonActive]: isActiveItem,
          [styles.grey]: style === 'grey',
          [styles.white]: style === 'white',
        })}>
        <Dots/>

      </div>
      {!props.children &&
      <nav ref={dropdownRefItem} className={cx(styles.dropDown, {[styles.dropDownActive]: isActiveItem})}>
        {options.map(item =>
          <a className={styles.option} onClick={(e) => handleClickItem(e, item.key)}>{item.name}</a>
        )}
      </nav>}
    </div>
  )
}

ButtonDots.defaultProps = {
  style: 'grey',
}
