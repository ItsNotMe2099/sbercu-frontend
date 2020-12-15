import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import File from "components/dashboard/File";
import Quantity from "pages/dashboard/components";
import { useState } from "react";


export default function Profile(props){

  const items = [
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'}
  ]
  const [isShow, setIsShow] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)
  return (
    <Layout>
    <Header>

    </Header>
    <div className={styles.root}>
    <div className={styles.title}>Основная информация</div>
      <div className={styles.top}>
        <div className={styles.sections}>
        {isShow ?
        <>
        <div className={styles.section}>
        <div className={styles.name}>Логин</div>
        <div className={styles.value}>khodik.ab.</div>
      </div>
        <div className={styles.section}>
        <div className={styles.name}>Почта</div>
        <div className={styles.value}>khodik.ab.@sberbank.ru</div>
      </div>
        <div className={styles.section}>
        <div className={styles.name__name}>Имя</div>
        <div className={styles.value}>Александр</div>
      </div>
      <div className={styles.section}>
        <div className={styles.name__surname}>Фамилия</div>
        <div className={styles.value}>Ходик</div>
      </div>
      <div className={styles.section}>
        <div className={styles.name}>ВШ ID</div>
        <div className={styles.value}>2345678</div>
      </div>
      <a  className={styles.more} onClick={() => setIsShow(false)}>
          <img className={styles.image} src="img/icons/arrowDown.svg" alt=''/><span>Скрыть</span>
        </a>
      </>
        :
        <>
        <div className={styles.section}>
          <div className={styles.name__name}>Имя</div>
          <div className={styles.value}>Александр</div>
        </div>
        <div className={styles.section}>
          <div className={styles.name__surname}>Фамилия</div>
          <div className={styles.value}>Ходик</div>
        </div>
        <div className={styles.section}>
          <div className={styles.name}>Почта</div>
          <div className={styles.value}>khodik.ab.@sberbank.ru</div>
        </div>
        <a className={styles.more} onClick={() => setIsShow(true)}>
          <img src="img/icons/arrowDown.svg" alt=''/><span>Показать еще</span>
        </a>
        </>}
        </div>
        <div className={styles.tags}>
          <div>
            <div className={styles.title__tag}>Доступно управление тегами</div>
            <div className={styles.tag}>Школа финансов</div>
          </div>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.title__tag && styles.title__file}>Файлы загруженные мной</div>
        <Quantity
        quantity='2000'
        />
      </div>
      <div className={styles.files}>
        {(showFiles ? items : items.slice(0, 5)).map(item => (<File
        item={{
          id: 1,
          name: item.title,
          entryType: 'video',
          createdAt: item.date
        }}
        />))}
      </div>
      <div className={styles.moreFiles}>
        <a onClick={() => showFiles ? setShowAllFiles(false) : setShowAllFiles(true)}>
          <img className={showFiles ? styles.hide : null} src="img/icons/arrowDown.svg" alt=''/>{showFiles ? <span>Скрыть</span> : <span>Показать еще</span>}
        </a>
      </div>
    </div>
    <Footer/>
    </Layout>
  )
}

