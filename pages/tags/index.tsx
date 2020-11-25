import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import TagCategory from "components/tags/TagCategory";



export default function Tags(props){
  
  return (
    <body className={styles.white}>
    <Header tagsPage/>
    <div className={styles.root}>
      <div className={styles.title}>Теги</div>
      <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
      <TagCategory categoryText='Подразделения'/>
      <TagCategory categoryText='Раздел'/>
      <TagCategory categoryText='Тема'/>
      <TagCategory categoryText='Форма обучения'/>
      <TagCategory categoryText='Обязательность'/>
      <TagCategory categoryText='Компетенции'/>
    </div>
    </body>
  )
}

