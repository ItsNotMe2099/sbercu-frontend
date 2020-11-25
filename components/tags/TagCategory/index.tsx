import Button from 'components/ui/Button'
import CategoryHead from './CategoryHead'
import styles from './index.module.scss'
import TagItem from './TagItem'

interface Props{
  categoryText: string
  dots?: boolean
}

export default function TagCategory(props: Props){
  const options = [{label: 'Системное мышление и решение проблем', value: 1}, {label: 'Клиентоцентричность', value: 2}, {label: 'Развитие команд и сотрудничество', value: 3}, {label: 'Продукты и рынки', value: 4}, {label: 'Клиентоцентричность', value: 5}, {label: 'Клиентоцентричность', value: 6}, {label: 'Клиентоцентричность', value: 7}, {label: 'Клиентоцентричность', value: 8}]

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
      {options.map(item => 
        <TagItem
        label={item.label}
        />
        )}
        <div className={styles.btnContainer}>
        <Button transparent brdrRadiusCircle brdrGreen textGreen size="6px">&larr;</Button>
        </div>
      </div>
    </div>
  )
}
