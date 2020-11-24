import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
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

  const projects = [
    {title: "Цифровые навыки", type: "blue"},
    {title: "Цифровые навыки", type: "blue"},
    {title: "Цифровые навыки", type: "blue"},
    {title: "Цифровые навыки", type: "blue"},
    {title: "Цифровые навыки", type: "blue"}
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
        {projects.map(item => (<Project
          type={item.type}
          title={item.title}
          />
          ))}
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

