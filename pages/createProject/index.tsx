import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import TagCategory from "components/tags/TagCategory";
import ProjectForm from "components/createProject/Form";



export default function createProject(props){
  
  return (
    <body className={styles.white}>
    <Header/>
    <div className={styles.root}>
      <div className={styles.title}>Создание нового проекта</div>
      <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
      <ProjectForm/>
    </div>
    </body>
  )
}

