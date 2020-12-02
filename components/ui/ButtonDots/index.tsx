import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import Dots from "components/svg/Dots";
import { ReactElement, useRef } from "react";
import styles from './index.module.scss'
import cx from 'classnames'

interface Props {
    children?: ReactElement
    onClick?: () => void
    onEditClick?:() => void
    onDeleteClick?:() => void
}

export default function ButtonDots(props: Props) {
    const dropdownRefItem = useRef(null)
    const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);
    const handleClick = (e) => {
        e.preventDefault()
        setIsActiveItem(!isActiveItem);
        if(props.onClick){
            props.onClick()
        }

    }
    const handleEditClick = (e) => {
        e.preventDefault()
        if(props.onEditClick){
            props.onEditClick()
        }
        setIsActiveItem(false);
    }
    const handleDeleteClick = (e) => {
        e.preventDefault()
        if(props.onDeleteClick){
            props.onDeleteClick()
        }
        setIsActiveItem(false);
    }
    return (
        <div className={styles.root}>
            <button
                type={'button'}
                onClick={handleClick}
                className={cx(styles.button, {[styles.buttonActive]: isActiveItem})}>
                <Dots/>

            </button>
            {!props.children &&  <nav ref={dropdownRefItem} className={cx(styles.dropDown, { [styles.dropDownActive]: isActiveItem})}>
              <div className={styles.option}><a onClick={handleEditClick}>Редактировать</a></div>
              <div className={styles.option}><a onClick={handleDeleteClick}>Удалить</a></div>
            </nav>}
        </div>
    )
}

ButtonDots.defaultProps = {}
