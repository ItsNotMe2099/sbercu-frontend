import Button from 'components/ui/Button'
import { useState } from 'react'
import styles from './index.module.scss'


interface Props {
  placeholder?: string,
    onChange?: (value) => void
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
          <Button search type="button" onClick={() => isOpen ? null : setIsOpen(true)}></Button>
      </div>
    </form>
  )
}
