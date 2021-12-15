import React, {useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'
import InputMask from 'react-input-mask'
import {pad} from 'utils/formatters'
import {parse} from 'date-fns'
import cx from 'classnames';
import {useDetectOutsideClick} from 'components/dashboard/TagSelect/useDetectOutsideClick'

function toNearestValidTime(time, hourOptions, minuteOptions, secondOptions, millisecondOptions) {
  const hour = hourOptions
    .slice()
    .sort((a, b) => Math.abs(time.hour() - a) - Math.abs(time.hour() - b))[0];
  const minute = minuteOptions
    .slice()
    .sort((a, b) => Math.abs(time.minute() - a) - Math.abs(time.minute() - b))[0];
  const second = secondOptions
    .slice()
    .sort((a, b) => Math.abs(time.second() - a) - Math.abs(time.second() - b))[0];
  const millisecond = millisecondOptions
    .slice()
    .sort((a, b) => Math.abs(time.millisecond() - a) - Math.abs(time.millisecond() - b))[0];
  return `${hour}:${minute}:${second}:${millisecond}`
}

interface Props {
  maxSeconds?: number,
  minSeconds?: number
  value: number,
  onChange: (value) => void,
  onClose: () => void
}

const convertTimeToNumber = (val) => {
  const parts = val.replace(/_/g, '').split(':');

  const hours = parseInt(parts[0], 10);
  const mins = parseInt(parts[1], 10);
  const seconds = parseFloat(parts[2]);
  console.log(`h = ${hours}, m = ${mins}, s = ${seconds}`, parts);
  return (hours * 60 * 60) + (mins * 60) + seconds;
}
const formatSeconds = (seconds, showMs = false) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  const mss = date.getUTCMilliseconds();

  if (hh) {
    return `${pad(hh)}:${pad(mm)}:${ss}${showMs ? `.${mss}` : ''}`
  }
  return `00:${pad(mm)}:${ss}${showMs ? `.${mss}` : ''}`
}
export default function DurationInput({value, onChange, minSeconds, maxSeconds, onClose}: Props) {
  const inputRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(inputRef, true);

  const [newValue, setNewValue] = useState(null);
  useEffect(() => {
    console.log("Value", value);
    setNewValue(formatSeconds(value, true));
  }, [])
  useEffect(() => {
    if(!isActive){
      onClose();
    }
  }, [isActive])
  const [error, setError] = useState(false);
  const handleChange = (e) => {


    const val = e.currentTarget.value;
    try {
      const parsed = parse(val, 'HH:mm:ss.SSS', new Date());
      setNewValue(val);
      if (isNaN(parsed.getTime())) {
        setError(true);
        return;
      }
      const seconds = convertTimeToNumber(val);
      console.log("TimeToNumber", seconds, maxSeconds, seconds >= maxSeconds)
      if (seconds <= minSeconds || seconds >= maxSeconds) {
        setError(true);
        return;
      }
      console.log("Change",maxSeconds, seconds, val, convertTimeToNumber(val), parsed);
      setError(false);
      onChange(convertTimeToNumber(val));
    } catch (e) {
      setError(true);
    }
  }
  const handleBlur = (e) => {
    onClose();
  }
  console.log("ValueProps", value);
  return (<div className={styles.root} ref={inputRef}>

      <input className={cx(styles.input, {[styles.error]: error})} value={newValue} onBlur={handleBlur} onChange={handleChange}/>
    </div>
  );
};


