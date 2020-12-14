import Button from 'components/ui/Button'
import { useState } from 'react'
import styles from './index.module.scss'


interface Props {
  placeholder?: string,
    onChange?: (value) => void
    onClick?: () => void
}

export default function InputSearch(props: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <form className={styles.form} action='/search'>
      <div className={isOpen ? styles.inputContainer__mobile : styles.inputContainer}>
          <input
              name="query"
              type='text'
              onChange={(e) => {
                  if(props.onChange){
                      props.onChange(e.currentTarget.value)
                  }
              }}
              placeholder={props.placeholder}
          />
          <div onClick={props.onClick} className={styles.btn}><Button search type="button"></Button></div>
          <div onClick={props.onClick} className={styles.mobileBtns}>
          {isOpen ?
          <div className={styles.cross}><Button cross type="button" onClick={() => setIsOpen(false)}></Button></div>
          :
          <Button search type="button" onClick={() => setIsOpen(true)}></Button>}</div>
      </div>
    </form>
  )
}
