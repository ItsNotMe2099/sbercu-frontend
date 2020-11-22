import Link from 'next/link'
import styles from './index.module.scss'

interface Props{
  type: string
  date: string
  author: string
  size?: string
  length?: string
  title: string
  additionalInfo?: boolean
}

export default function File(props: Props){

  const getIconByType = (type) => {
    switch(type) {
      case 'video':
        return 'img/icons/camera.svg'
      case 'audio':
        return 'img/icons/audio.svg'
      case 'document':
        return 'img/icons/document.svg'
    }
     
  }
  return (
    <div className={styles.root}>
      <div className={styles.image}><img src={getIconByType(props.type)} alt=''/></div>
      <Link href="#">
      <a className={styles.inner}>
        <div className={styles.title}>
          {props.title}
        </div>
        <div className={styles.bottom}>
          <div className={styles.text}>{props.date}</div>
          <div className={styles.separator}></div>
          <div className={styles.text}>{props.author}</div>
          {props.additionalInfo ?
          <>
          <div className={styles.separator}></div>
          <div className={styles.text}>{props.size}</div>
          <div className={styles.separator}></div>
          <div className={styles.text}>{props.length}</div>
          </>
          :
          null}
        </div>
      </a>
      </Link>
      <div><a><img src="img/icons/dots.svg" alt=''/></a></div>
    </div>
  )
}
