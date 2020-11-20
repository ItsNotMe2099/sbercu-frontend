import Button from "components/ui/Button";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Welcome from 'components/svg/Welcome'
import { TagSelect } from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";



export default function Dashboard(props){
  return (
    <body className={styles.white}>
    <div className={styles.root}>
      <TagSelect/>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Проекты</div>
        <div className={styles.quantity}></div>
      </div>
      <div className={styles.projects}>
        <Project 
        color="#2D9CDB"
        title="Цифровые навыки"
        />
        <Project 
        color="#333333"
        title="Инструменты обработки, анализа и визуализации..."
        />
        <Project 
        color="#EB5757"
        title="Основы программирования на языке Python"
        />
        <Project 
        color="#F2C94C"
        title="Школа CRO"
        />
        <Project 
        color="#EB5757"
        title="Основы программирования на языке Python"
        />
        <Project 
        color="#333333"
        title="Инструменты обработки, анализа и визуализации..."
        />
      </div>
    </div>
    </body>
  )
}


