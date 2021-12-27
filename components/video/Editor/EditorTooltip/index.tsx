import Basket from "components/svg/Basket";
import PlusSvg from "components/svg/PlusSvg";
import Duration from "components/video/Duration";
import Range from "components/video/Editor/EditorTrimmer/Range/Range";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from 'react'
import { IVideoTrimRange } from "types";
import styles from './index.module.scss'
import Ruler from 'hc-react-ruler';

interface Props {
    cutItems: IVideoTrimRange[]
    seconds: number,
    rootRef: any
    onAdd: (seconds) => void,
    onDelete: (cutItem) => void
    onMouseMove:(e) => void
    onMouseLeave:(e) => void
    onMouseEnter:() => void
}

export default function EditorTooltip({ rootRef, seconds, cutItems, onAdd, onDelete, onMouseMove, onMouseLeave, onMouseEnter }: Props) {
    const cutItem = cutItems.find((it) => (seconds >= it.start && seconds <= it.end))
    const handleAdd = (e) => {
        e.stopPropagation()
        console.log("OnAdd", seconds)
        onAdd(seconds);

    }
    const handleDelete = (e, cutItem) => {
        e.stopPropagation()
        if (cutItem) {
            onDelete(cutItem);
        }
    }
    return (<div className={`${styles.root} ${cutItem && styles.rootDelete}`} ref={rootRef}  onClick={cutItem ? (e) => handleDelete(e, cutItem) : handleAdd} onMouseEnter={onMouseEnter} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>

        <div className={styles.line}></div>

        <div className={cutItem ? styles.tip : styles.noTip}>
        {!cutItem ?
            <div className={styles.addState} onClick={() => onAdd(seconds)}>
                <Duration className={styles.currentTime} seconds={seconds} showMs/>
            </div>
            :
            <div className={styles.deleteState}>
                <div className={styles.cutItem}>
                    <div className={styles.duration}><Duration className={styles.time} seconds={cutItem.start} showMs/> - <Duration  className={styles.time} seconds={cutItem.end} showMs/></div>
                </div>
                <Duration className={styles.currentTime} seconds={seconds} showMs/>
            </div>

        }
        </div>
        {cutItem && <div className={styles.arrowDown}/>}
        {!cutItem ?
            <div className={styles.add}><PlusSvg/></div>
            :
            <div className={styles.delete}><Basket/></div>

        }
        {cutItem && <div className={styles.arrowUp}/>}
    </div>)
}


