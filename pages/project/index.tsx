import Button from "components/ui/Button";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Welcome from 'components/svg/Welcome'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";



export default function Project(props){
  const items = [
    /*{title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '12.09.2019', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '12.09.2019', type: 'audio'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '12.09.2019', type: 'document'}*/
  ]
  
  return (
    <body className={styles.white}>
    <Header projectPage/>
    <div className={styles.root}>
      <div className={styles.head}>
      {items.length !== 0 ? <div className={styles.title}>Цифровые навыки</div> : <div className={styles.title}>Управление проектами</div>}
        <div className={styles.image}><a><img src="img/icons/dots.svg" alt=''/></a></div>
      </div>
      {items.length !== 0 ? <div className={styles.main}>Главная</div> : <div className={styles.mainNoFiles}><div><Link href="">Главная</Link></div><div>←</div><div><Link href="">Цифровые навыки</Link></div></div>}
      {items.length !== 0 ? <div className={styles.duration}>439 материала, 197 часов видео</div> : null}
      {items.length !== 0 ?
      <div className={styles.files}>
        {items.map(item => (<File
        date={item.date}
        author={item.author}
        title={item.title}
        type={item.type}
        size={item.size}
        length={item.length}
        additionalInfo
        />))}
      </div>
      :
      <a className={styles.noFiles}>
        <div className={styles.text}>
          <div className={styles.firstText}>В эту папку пока никто ничего не загрузил. Подождем...</div>
          <div className={styles.secondText}>В папках можно хранить любое фото, видео, аудио или текстовые материалы</div>
          <div className={styles.iconText}><img src="img/icons/files.svg" alt=''/><span>Перенесите сюда файл или нажмите для выбора файла на компьютере</span></div>
        </div>
        <div className={styles.clock}><img src="img/icons/clock.svg" alt=''/></div>
        <div className={styles.human}><img src="img/icons/human.svg" alt=''/></div>
        <div className={styles.plant}><img src="img/icons/plant.svg" alt=''/></div>
      </a>
      }
    </div>
    </body>
  )
}

