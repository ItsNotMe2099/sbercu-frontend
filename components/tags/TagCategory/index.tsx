import { TagSelectItem } from "components/dashboard/TagSelect/TagItem";
import { useDetectOutsideClick } from "components/dashboard/TagSelect/useDetectOutsideClick";
import Button from 'components/ui/Button'
import ButtonDots from "components/ui/ButtonDots";
import { useRef, useState } from 'react'
import { ITag, ITagCategory } from "types";
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
    const tags = item.tags.sort((a, b) => {
        if (a.name < b.name) return -1
        return a.name > b.name ? 1 : 0
    })
    const onClick = () => {
        setShowAll(show => !show)
    }
    const handleEditClick = () => {
        if(onEditClick){
            onEditClick(item)
        }
    }
    const handleDeleteClick = () => {
        if(onDeleteClick){
            onDeleteClick(item)
        }
    }


    return (
        <div className={styles.root}>
            <div className={styles.head}>
                {!props.hideHeader && <div className={styles.categoryText}>{item.name}</div>}
                {editMode && <ButtonDots onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>}
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
                  <TagArrow onClick={onClick} transparent brdrRadiusCircle brdrGreen textGreen
                          type="button">{show ? <>&larr;</> : <>&rarr;</>}</TagArrow>
                </div>}
            </div>
            <div className={styles.clearfix__mobile}>
                {(show ? tags : tags.slice(0, 1)).map(item =>
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
                {tags.length > 1 && <div className={styles.btnContainer}>
                  <TagArrow onClick={onClick} transparent brdrRadiusCircle brdrGreen textGreen
                          type="button">{show ? <>&larr;</> : <>&rarr;</>}</TagArrow>
                </div>}
            </div>
        </div>
    )
}
