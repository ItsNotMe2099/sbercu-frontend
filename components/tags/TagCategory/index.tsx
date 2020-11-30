import { TagSelectItem } from "components/dashboard/TagSelect/TagItem";
import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import Button from 'components/ui/Button'
import { useRef, useState } from 'react'
import { ITag, ITagCategory } from "types";
import CategoryHead from './CategoryHead'
import styles from './index.module.scss'
import TagItem from './TagItem'
import cx from 'classnames'
import TagArrow from "components/ui/TagArrow";

interface Props {
    item: ITagCategory
    onEditClick?: (item) => void
    onDeleteClick?: (item) => void
    onTagClick?: (item, selected) => void
    onTagEditClick?: (item) => void
    onTagDeleteClick?: (item) => void
    selectedTags: ITag[]
    editMode?: boolean
    green?: boolean,
    hideHeader?: boolean
}

export default function TagCategory({ item, editMode, onTagClick, onTagEditClick, onTagDeleteClick, onEditClick, onDeleteClick, selectedTags, ...props }: Props) {

    const [show, setShowAll] = useState(false)
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const onClickDots = (e) => {
        e.preventDefault()
        setIsActive(!isActive);
    }
    const onClick = () => {
        setShowAll(show => !show)
    }
    const handleEditClick = (e) => {
        console.log("handleEditClick")
        e.preventDefault()
        if(onEditClick){
            onEditClick(item)
        }
        setIsActive(false);
    }
    const handleDeleteClick = (e) => {
        e.preventDefault()
        if(onDeleteClick){
            onDeleteClick(item)
        }

        setIsActive(false);

    }


    return (
        <div className={styles.root}>
            <div className={styles.head}>
                {!props.hideHeader && <div className={styles.categoryText}>{item.name}</div>}

                {editMode && <div className={styles.edit}>
                  <a className={styles.dots} onClick={onClickDots}><img src="/img/icons/dots.svg" alt=''/>
                    <nav ref={dropdownRef} className={cx(styles.dropDown, { [styles.dropDownActive]: isActive })}>
                      <div className={styles.option}><a onClick={handleEditClick}>Редактировать</a></div>
                      <div className={styles.option}><a onClick={handleDeleteClick}>Удалить</a></div>
                    </nav>
                  </a>
                </div>}
            </div>
            <div className={styles.clearfix}>
                {(show ? item.tags : item.tags.slice(0, 3)).map(item =>
                    <TagItem
                        green={props.green}
                        onClick={onTagClick}
                        onEditClick={onTagEditClick}
                        onDeleteClick={onTagDeleteClick}
                        editMode={editMode}
                        isSelected={!!selectedTags.find(i => i.id === item.id)}
                        item={item}
                    />
                )}
                {item.tags.length > 3 && <div className={styles.btnContainer}>
                  <TagArrow onClick={onClick} transparent brdrRadiusCircle brdrGreen textGreen size="6px"
                          type="button">{show ? <>&larr;</> : <>&rarr;</>}</TagArrow>
                </div>}
            </div>
        </div>
    )
}
