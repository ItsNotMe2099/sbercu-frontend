import { fetchCatalogList, fetchCatalogProjects } from "components/catalog/actions";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import { useEffect } from "react";
import { IRootState } from "types";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import { TagSelect } from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import { useDispatch, useSelector } from 'react-redux'


export default function Dashboard(props){
  const dispatch = useDispatch();
  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const projects = useSelector((state: IRootState) => state.catalog.projects)

  useEffect(() => {
    dispatch(fetchTagCategoryList());
    dispatch(fetchCatalogProjects({entryType: 'project'}))
  }, [])

  const handleTagChangeTags = (tags) => {
    dispatch(fetchCatalogProjects({entryType: 'project', ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}))
  }
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
      <TagSelect items={tagCategories} onChangeSelectedTags={handleTagChangeTags}/>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Проекты</div>
        <Quantity
        quantity={projects.length}
        />
      </div>
      <div className={styles.projects}>
        {projects.map(item => (<Project
          item={item}
          />
          ))}
      </div>
      {projects.length > 5 && <div className={styles.more}>
        <a>
          <img src="img/icons/arrowDown.svg" alt=''/><span>Показать еще</span>
        </a>
      </div>}
      <div className={styles.titleContainer}>
        <div className={styles.title}>Файлы</div>
        <Quantity
        quantity='2000'
        />
      </div>
      <div className={styles.files}>
        {items.map(item => (<File
        item={{
          id: 1,
          name: item.title,
          entryType: 'video',
          createdAt: item.date
        }}
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

