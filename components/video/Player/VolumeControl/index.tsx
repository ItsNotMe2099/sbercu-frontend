import styles from './index.module.scss'
import Arrow from 'components/svg/Arrow'
import { useDetectOutsideClick } from 'components/dashboard/TagSelect/useDetectOutsideClick';
import { useRef, useState } from 'react';
import cx from 'classnames'
import Slider from 'react-input-slider';
interface Props {
  value: any
  onChange: (value) => void
}

export default function VolumeControl(props: Props) {

    const handleChange = (val) => {
        props.onChange(val)
    }
    const handleIconClick = (val) => {
        props.onChange(props.value === 0 ? 50 : 0);
    }
  return (
      <div className={styles.root}>
          <div className={styles.icon} onClick={handleIconClick}>{props.value === 0 ? <img src={'/img/icons/mute.svg'}/> : <img src={'/img/icons/volume.svg'}/> }</div>
          <div className={styles.slider}>
        <Slider
            styles={{
                track: {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    height: 5,
                    width: 50
                },
                active: {
                    backgroundColor: 'white'
                },
                thumb: {
                    width: 10,
                    height: 10
                },
                disabled: {
                    opacity: 0.5
                }
            }}
            xstep={1}
            xmin={0}
            xmax={100}
            axis="x"
            x={props.value}
            onChange={({x}) => handleChange(x)}
        />
          </div>

      </div>
  )
}
