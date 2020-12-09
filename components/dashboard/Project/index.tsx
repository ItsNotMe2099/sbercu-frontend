import Link from 'next/link'
import { ICatalogEntry } from "types";
import styles from './index.module.scss'

interface Props{
  item: ICatalogEntry
}

export default function Project({item}: Props){

  const getColorByType = (type) => {
    switch(type) {
      case 'black':
        return '#333333'
      case 'red':
        return '#EB5757'
      case 'yellow':
        return '#F2C94C'
      case 'blue':
      default:
        return '#2D9CDB'
    }

  }
  console.log('cover', item.projectCover)



  return (
    <Link href={`/catalog/${item.id}`}>
      <a className={styles.container}>
      <div className={styles.root}>
  <div className={`${item.projectCover !== "link to cover" && item.projectCover !== null ? styles.cover : styles.square}`} style={{backgroundColor: getColorByType(item.entryType)}}>
    {item.projectCover !== "link to cover" && item.projectCover !== null ? 
    <img src={`https://dev.sbercu.firelabs.ru/api/media/files/${item.projectCover}`} alt=''/> 
    : null}
  </div>
      <div className={styles.title}>{item.name}</div>
    </div>
    </a>
    </Link>
  )
}
