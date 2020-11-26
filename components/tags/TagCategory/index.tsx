import Button from 'components/ui/Button'
import { useState } from 'react'
import CategoryHead from './CategoryHead'
import styles from './index.module.scss'
import TagItem from './TagItem'

interface Props{
  categoryText: string
  dots?: boolean
  green?: boolean
}

export default function TagCategory(props: Props){
  const options = [{label: 'Системное мышление и решение проблем', value: 1}, {label: 'Клиентоцентричность', value: 2}, {label: 'Развитие команд и сотрудничество', value: 3}, {label: 'Продукты и рынки', value: 4}, {label: 'Клиентоцентричность', value: 5}, {label: 'Клиентоцентричность', value: 6}, {label: 'Клиентоцентричность', value: 7}, {label: 'Клиентоцентричность', value: 8}]
  const [show, setShowAll] = useState(false)
  const onClick = () => {
    setShowAll(show => !show)
  }

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div className={styles.categoryText}>{props.categoryText}</div>
        {props.dots ?
        <CategoryHead dots/>
        :
        <CategoryHead/>}
      </div>
      <div className={styles.clearfix}>
        {(show ? options : options.slice(0,3)).map(item => 
          <TagItem
          green={props.green}
          label={item.label}
          />
          )}
        <div className={styles.btnContainer}>
        <Button onClick={onClick} transparent brdrRadiusCircle brdrGreen textGreen size="6px" type="button">{show ? <>&larr;</> : <>&rarr;</>}</Button>
        </div>
      </div>
    </div>
  )
}
