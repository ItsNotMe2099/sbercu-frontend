import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import Dots from "components/svg/Dots";
import { ReactElement, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'

interface Props {
    children?: ReactElement
    onClick?: () => void
    onEditClick?:() => void
    onDeleteClick?:() => void
    onCopyClick?: () => void
    onPasteClick?: () => void
    showPaste?: boolean
}

export default function ButtonDots(props: Props) {
    const dropdownRefItem = useRef(null)
    const dotsRef = useRef(null)
   const [isActiveItem, setIsActiveItem] = useDetectOutsideClick(dropdownRefItem, false);
    const handleCopyClick = (e) => {
        e.preventDefault()
        if(props.onCopyClick){
            props.onCopyClick()
        }

        setIsActiveItem(false);
    }

    const handlePasteClick = (e) => {
        e.preventDefault()
        if(props.onPasteClick){
            props.onPasteClick()
        }
        setIsActiveItem(false);
    }

    const handleClick = (e) => {
        e.preventDefault()
        const params = dotsRef.current?.getBoundingClientRect();
        if(params) {
            const offset = params.x + params.width;
            if (offset - dropdownRefItem.current?.offsetWidth < 20) {
                dropdownRefItem.current.style.right = `-${dropdownRefItem.current?.offsetWidth - params.width}px`
            }
        }
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
            <div
                ref={dotsRef}
                onClick={handleClick}
                className={cx(styles.button, {[styles.buttonActive]: isActiveItem})}>
                <Dots/>

            </div>
            {!props.children &&  <nav ref={dropdownRefItem} className={cx(styles.dropDown, { [styles.dropDownActive]: isActiveItem})}>
              <div className={styles.option}><a onClick={handleEditClick}>Редактировать</a></div>
              <div className={styles.option}><a onClick={handleCopyClick}>Копировать</a></div>
              {(typeof  localStorage !== 'undefined' && localStorage.getItem('copyCatalog') && props.showPaste) && <div className={styles.option}><a onClick={handlePasteClick}>Вставить</a></div>}
                <div className={styles.option}><a onClick={handleDeleteClick}>Удалить</a></div>
            </nav>}
        </div>
    )
}

ButtonDots.defaultProps = {
    showPaste: true
}
