import { fetchCatalogList, fetchCatalogProjects } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import { TagSelect } from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import { useDispatch, useSelector } from 'react-redux'
import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import ProjectLoader from "components/ContentLoaders/projectLoader";


export default function Dashboard(props){
  const dispatch = useDispatch();
  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const projects = useSelector((state: IRootState) => state.catalog.projects)
  const [show, setShowAll] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)

  useEffect(() => {
    dispatch(fetchTagCategoryList());
    dispatch(fetchCatalogProjects({entryType: 'project'}))
  }, [])

  const handleTagChangeTags = (tags) => {
    dispatch(fetchCatalogProjects({entryType: 'project', ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}))
  }
  const items = [
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'vasya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
    {title: 'file1', author: 'tanya', length: '100', size: '500', date: '2020-12-02T08:36:16.819', type: 'video'},
  ]


  return (
    <Layout>
    <Header/>
    {projects.length === 0 ?
    <>
    <DashboardLoader/>
    <ProjectLoader/>
    </>
    :
    <div className={styles.root}>
      <TagSelect items={tagCategories} onChangeSelectedTags={handleTagChangeTags}/>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Проекты</div>
        <Quantity
        quantity={projects.length}
        />
      </div>
      <div className={styles.projects}>
      {(show ? projects : projects.slice(0, 5)).map(item => (<Project
          item={item}
          />
          ))}
      </div>
      <div className={styles.projectMobile}>
          {(show ? projects : projects.slice(0, 4)).map(item => (<Project
          item={item}
          />
          ))}
      </div>
      {projects.length > 5 && <div className={styles.more}>
        <a onClick={() => show ? setShowAll(false) : setShowAll(true)}>
          <img className={show ? styles.hide : null} src="img/icons/arrowDown.svg" alt=''/>{show ? <span>Скрыть</span> : <span>Показать еще</span>}
        </a>
      </div>}
      <div className={styles.titleContainer}>
        <div className={styles.title}>Файлы</div>
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
}
      <Footer/>
    </Layout>
  )
}

