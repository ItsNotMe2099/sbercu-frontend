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
      <TagCategory dots categoryText='Подразделения'/>
      <TagCategory dots categoryText='Раздел'/>
      <TagCategory dots categoryText='Тема'/>
      <TagCategory dots categoryText='Форма обучения'/>
      <TagCategory dots categoryText='Обязательность'/>
      <TagCategory dots categoryText='Компетенции'/>
    </div>
    </body>
  )
}

