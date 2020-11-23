import Link from 'next/link'
import styles from './index.module.scss'

interface Props{
  type: string
  title: string
}

export default function Project(props: Props){

  const getColorByType = (type) => {
    switch(type) {
      case 'blue':
        return '#2D9CDB'
      case 'black':
        return '#333333'
      case 'red':
        return '#EB5757'
      case 'yellow':
        return '#F2C94C'
    }
     
  }

  return (
    <Link href="/project">
      <a className={styles.container}>
      <div className={styles.root}>
      <div className={styles.square} style={{backgroundColor: getColorByType(props.type)}}></div>
      <div className={styles.title}>{props.title}</div>
    </div>
    </a>
    </Link>
  )
}
