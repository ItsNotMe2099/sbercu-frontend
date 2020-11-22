import Button from "components/ui/Button";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Welcome from 'components/svg/Welcome'
import { TagSelect } from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File from "components/dashboard/File";
import Header from "components/layout/Header";



export default function Dashboard(props){
  const items = [
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '12.09.2019', type: 'video'}
  ]
  
  return (
    <body className={styles.white}>
    <Header/>
    <div className={styles.root}>
      <TagSelect/>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Проекты</div>
        <Quantity
        quantity='168'
        />
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
      </div>
      <div className={styles.more}>
        <a>
          <img src="img/icons/arrowDown.svg" alt=''/><span>Показать еще</span>
        </a>
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Файлы</div>
        <Quantity
        quantity='2000'
        />
      </div>
      <div className={styles.files}>
        {items.map(item => (<File
        date={item.date}
        author={item.author}
        title={item.title}
        type={item.type}
        />))}
      </div>
      <div className={styles.moreFiles}>
        <a>
          <img src="img/icons/arrowDown.svg" alt=''/><span>Показать еще</span>
        </a>
      </div>
    </div>
    </body>
  )
}

