import { confirmOpen, modalClose } from "components/Modal/actions";
import Basket from "components/svg/Basket";
import Info from "components/svg/Info";
import PlusSvg from "components/svg/PlusSvg";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import Duration from "components/video/Duration";
import Range from "components/video/Editor/EditorTrimmer/Range/Range";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from 'react'
import { IVideoTrimRange } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable';
import DurationInput from 'components/video/DurationInput'
import cx from 'classnames';
interface Props {
    cutItems: IVideoTrimRange[],
    duration: number,
    onSeek: (value) => void,
    onClear: () => void,
    onDelete: (cutItem) => void,
    onSetCutItems: (cutItems) => void
}

export default function EditorCutInfo(props: Props) {
    const {cutItems, onSetCutItems} = props;
    const dispatch = useDispatch();
    const [showHelp, setShowHelp] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [hasIteraction, setHasIteraction] = useState(false);
    const hasIteractiontRef = useRef(false);
    const [activeItemIndex, setActiveItemIndex] = useState(null);
    const [activeItemType, setActiveItemType] = useState(null);

    const getTotalCut = () => {
        return props.cutItems.reduce((itemA, itemB) => itemA + itemB.end - itemB.start, 0);
    }
    const getTotalDuration = () => {
        return props.duration - props.cutItems.reduce((itemA, itemB) => itemA + itemB.end - itemB.start, 0);
    }
    const handleHelp = () => {
        setShowHelp((help) => !help)
    }
    useEffect(() => {
        if(props.cutItems.length > 0) {
            if(!      hasIteractiontRef.current) {
             setExpanded(true)
                setHasIteraction(true);
                hasIteractiontRef.current = true;
            }
        }
    }, [props.cutItems])
    const handleClear = () => {
        dispatch(confirmOpen({
            title: 'Вы уверены, что хотите отменить все изменения?',
            description: '',
            confirmColor: 'red',
            confirmText: 'Очистить',
            onConfirm: () => {
                props.onClear();
                dispatch(modalClose());
            }
        }));
    }
    const handleExpand = () => {
        setExpanded(true);
    }
    const handleClose = () => {
        setExpanded(false);
    }
    const renderHelp = () => {
        return ( <div className={styles.help}>
            <p>С помощью редактора вы можете вырезать 1 или несколько фрагментов видео. </p>
            <p>Для того чтобы <span className={styles.green}>добавить фрагмент </span> для обрезки наведите мышью на нужное время на прогресс баре и нажмите левую кнопку мыши.</p>
            <p>Для <span className={styles.red}>удаления</span> фрагмента навидте на него курсор и нажмите удалить.</p>
            <p>После того как вы отметите все фрагменты нажмите кнопку <span className={styles.green}>сохранить</span> в нижней части экрана.</p>
            <p><span className={styles.red}>* </span>Данное окно можно перемещать.</p>
            {props.cutItems.length > 0 && <p><span className={styles.red}>* </span>Чтобы скрыть данное окно нажмите крестик. Потом его можно будет сново развернуть.</p>}
        </div>);
    }

    const handleClickItem = (seconds, index, type) => {
        if(activeItemIndex === index){
            setActiveItemIndex(null);
            setActiveItemType(null);
        }else {
            setActiveItemIndex(index);
            setActiveItemType(type);
        }
        props.onSeek(seconds);
    }
    const handleCloseItem = () => {
        props.onSeek(props.cutItems[activeItemIndex][activeItemType]);
        setActiveItemIndex(null);
        setActiveItemType(null);
    }
    const handleChangeDuration = (value, index, type) => {
        const newCutItems = cutItems.map((item, idx) => ({...item, ...(idx === index ? {[type] : value} : {} )}))
        console.log("newCutItems",  value,index, type, newCutItems, newCutItems[index][type])
        onSetCutItems(newCutItems);
    }


    return (<Draggable offsetParent={window.document.getElementById('video-editor')} bounds="parent">
        {!expanded || (hasIteraction && props.cutItems.length === 0)? <div className={styles.expandButton} onClick={handleExpand}><Info/></div> : <div className={cx(styles.root, {[styles.edited]: !!activeItemType})}>
            <div className={styles.header}>
                <div className={styles.title}>Редактор</div>
                <div className={styles.close} onClick={handleClose}><img src={'/img/icons/close.svg'}/></div>
            </div>
        {props.cutItems.length > 0 ? <div>
        <div className={styles.cutItemsTitle}>Вырезанные фрагменты ({props.cutItems.length}):</div>
             <div className={styles.cutItemsWrapper}>
             <div className={styles.cutItems}>
                {props.cutItems.map((item, index) => <div key={item.id} className={styles.cutItem}>
                    <div className={styles.cutItemNumber}>{index + 1}.</div>
                    <div className={styles.cutItemRange}>
                        {activeItemIndex === index && activeItemType ==='start' ? <DurationInput onClose={handleCloseItem} minSeconds={index > 0 ? props.cutItems[index - 1].end : 0} maxSeconds={item.end} value={item.start} onChange={(value) => handleChangeDuration(value, index, 'start')}/>  : <Duration onClick={(seconds) => handleClickItem(seconds, index, 'start')} className={styles.time} seconds={item.start}  showMs={true} />} -
                        {activeItemIndex === index && activeItemType ==='end' ? <DurationInput onClose={handleCloseItem} minSeconds={item.start} maxSeconds={(index + 1) < props.cutItems.length ? props.cutItems[index + 1].start : props.duration} value={item.end} onChange={(value) => handleChangeDuration(value, index, 'end')}/> :  <Duration onClick={(seconds) => handleClickItem(seconds, index, 'end')} className={styles.time} seconds={item.end}  showMs={true}/>}
                    </div>
                    <div className={styles.cutItemDuration}><Duration seconds={item.end - item.start} showMs={true}/></div>
                    <div className={styles.cutItemDelete}><div className={styles.deleteButton} onClick={() => props.onDelete(item)}><Basket/></div></div>
                </div>)}
            </div>
            </div>
            <div className={styles.summary}>
                <div className={styles.summaryItem}>
                    <div className={styles.summaryItemLabel}>Вырезано:</div>
                    <div className={styles.summaryItemValue}><Duration seconds={getTotalCut()}/></div>
                </div>
                <div className={styles.summaryItem}>
                    <div className={styles.summaryItemLabel}>Итоговая длительность</div>
                    <div className={styles.summaryItemValue}><Duration seconds={getTotalDuration()}/></div>
                </div>
            </div>
          <div className={styles.actions}>
                <Button size={'0px'} textDarkGrey className={styles.helpToggle} onClick={handleHelp} transparent> {!showHelp ? 'Помощь' : 'Свернуть'}</Button>
                {props.cutItems.length > 0 && <div className={styles.clear} onClick={handleClear}>Очистить</div>}

            </div>
            {showHelp && renderHelp()}

        </div> : renderHelp()}
        </div>}</Draggable>
    );
};


