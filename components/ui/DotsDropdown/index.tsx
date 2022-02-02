import styles from './index.module.scss'
import Arrow from 'components/svg/Arrow'
import {useDetectOutsideClick} from 'components/dashboard/TagSelect/useDetectOutsideClick';
import {useRef} from 'react';
import cx from 'classnames'
import Dots from 'components/svg/Dots'
export interface IOption{
  label: string
  key: string
}
interface Props {
  className?: string
  style?: 'grey' | 'white'
  options: IOption[],
  onItemClick: (item) => void,
}

export default function DotsDropdown(props: Props) {
  const {style, className} = props;
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
  const handleItemClick = (item) => {
    setIsActiveItem(false);
    props.onItemClick(item)
  }
  return (
    <div className={cx(styles.root, className)}>
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

      <nav ref={dropdownRefItem} className={cx(styles.dropDown, {[styles.dropDownActive]: isActiveItem})}>
        {props.options.map(item =>
          <div className={styles.option} onClick={() => handleItemClick(item)}><span>{item.label}</span> </div>
        )}
      </nav>
    </div>
  )
}
DotsDropdown.defaultProps = {
  style: 'grey'
}