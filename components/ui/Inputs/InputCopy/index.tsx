import styles from './index.module.scss'
import CopySvg from 'components/svg/CopySvg'
import Input from 'components/ui/Inputs/Input'
import {useEffect, useRef, useState} from 'react'


interface Props {
  label?: string
  value: any
}

export default function InputCopy({value, label}: Props) {
  const timeoutRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    return () => {
      if(timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [])
  const handleCopy = () => {
    setIsCopied(true);
    const textField = document.createElement('textarea')
    textField.innerText = value;
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 3000) as any
  }
  return (
    <div className={styles.root}>
      <Input  className={styles.rootInput} meta={{}} input={{value, onChange: (val) => null}} label={label} disabled icon={<div className={styles.icon} onClick={handleCopy}><CopySvg/></div>}/>
      {isCopied && <div className={styles.copied}>Скопировано</div>}

    </div>

  )
}
