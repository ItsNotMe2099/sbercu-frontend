import Range from "components/video/Editor/EditorTrimmer/Range/Range";
import React, { useEffect, useRef, useState } from 'react'
import { IVideoTrimRange } from "types";
import { formatSeconds } from "utils/formatters";
import styles from './index.module.scss'

interface Props {
    duration: number,
    trimItems: IVideoTrimRange[],
    onChange: (value) => void
}

export default function EditorTrimmer(props: Props) {


    const colors = [
        'red',
        'blue',
        'yellow',
        'purple',
        'brown',
        'grey',
        'pink',
        'blue',
        'green'
    ]
    const handleChange = (value) => {
        const chunked = value.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index/2)

            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])
        const trackItems = chunked.map(item => ({id: `${item[0]}${item[1]}`, start: item[0], end: item[1]}));
        props.onChange(trackItems);
    }
    return (<div className={styles.root}>

            <div   className={styles.range} >
                <Range
                    className={styles.range}
                    count={props.trimItems.length}
                    min={0}
                    step={0.040}
                    max={props.duration}
                    pushable={true}
                    marks={props.trimItems.reduce((base, item) => {
                        base[item.start] = { label: formatSeconds(item.start, true) };
                        base[item.end] = { label: formatSeconds(item.end, true) };
                        return base;
                        }, {})}
                    value={props.trimItems.map(item => ([item.start, item.end])).flat()}
                    trackStyle={props.trimItems.map((item, index) => ([{backgroundColor: '#EB5757'}, {backgroundColor: '#4d4d4d'}])).flat()}
                    onAfterChange={(value) => {
                        console.log("onAfterChange", value);
                    }}
                    onChange={handleChange}
                    railStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                />
            </div>
        </div>
    );
};


