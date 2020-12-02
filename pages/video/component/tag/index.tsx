import styles from './index.module.scss'

interface Props{
  category: string
  tag: string
}

export default function Tag(props: Props){

  return (
          <div className={styles.tag}>
            <div className={styles.tagCategory}>{props.category}</div>
            <a className={styles.item}>
              <span>{props.tag}</span>
            </a>
          </div>
  )
}

