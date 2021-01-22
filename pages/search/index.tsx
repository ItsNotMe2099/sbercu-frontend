import { fetchCatalogList, fetchCatalogProjects, fetchMyUploadedFiles } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, createFolderOpen, editFileOpen, modalClose } from "components/Modal/actions";
import { fetchCatalogSearch } from "components/search/actions";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import { useRouter } from "next/router";
import FileEditModal from "components/FileEditModal";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import { logout, withAuthSync } from "utils/auth";
import { pluralize } from "utils/formatters";
import styles from './index.module.scss'
import { TagSelect } from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import { useDispatch, useSelector } from 'react-redux'
import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import ProjectLoader from "components/ContentLoaders/projectLoader";


const Search = (props) => {
  const dispatch = useDispatch();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const router = useRouter()
  const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
  const projects = useSelector((state: IRootState) => state.search.projects)
  const loading = useSelector((state: IRootState) => state.search.listLoading)
  const files = useSelector((state: IRootState) => state.search.files)
  const projectsTotal = useSelector((state: IRootState) => state.search.projectsTotal)
  const filesTotal = useSelector((state: IRootState) => state.search.filesTotal)

  const [show, setShowAll] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)
  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)
  const [noResults, setNoResults] = useState(true);

  const {query}  = router.query;
  console.log("query", query);
  useEffect(() => {
    if(!query){
      return;
    }
    dispatch(fetchTagCategoryList());
    dispatch(fetchCatalogSearch(query, {}));
  }, [query])

  useEffect(() => {
    if(projects.length > 0 || files.length > 0){
      setNoResults(false);
    }
  }, [projects, files])

  const handleTagChangeTags = (tags) => {
    console.log("handleTagChangeTags");
    dispatch(fetchCatalogSearch(query, {...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}));
 //   dispatch(fetchCatalogProjects({entryType: 'project', ...(tags.length > 0 ? {tags: tags.map(tag => tag.id).join(',')} : {})}))
  }

  const handleEditClick = useCallback((item) => {
      setCurrentEditCatalog(item);
      dispatch(editFileOpen());

  }, [])
  const handleDeleteClick = (item) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить файл?',
      description: item.name,
      confirmColor: 'red',
      confirmText: 'Удалить',
      onConfirm: () => {
      }
    }));
  }
  return (
    <Layout>
    <Header searchValue={query as string}/>

    <div className={styles.root}>
      {!loading && noResults ?
          <a className={styles.noFiles} >
            <div className={styles.text}>
              <div className={styles.firstText}>По вашему запросу ничего не найдено.</div>
              <div className={styles.secondText}>Попробуйте написать название материала по-другому или сократить запрос</div>
            </div>
            <div className={styles.images}>
              <img className={styles.lamp} src="/img/icons/lamp.svg" alt=''/>
            </div>
          </a>
          :
          <>
      <div className={styles.titleSearch}>{projectsTotal + filesTotal} {pluralize(projectsTotal + filesTotal, 'результат', 'результата', 'результатов') } поиска «{query}»</div>
      <TagSelect items={tagCategories} onChangeSelectedTags={handleTagChangeTags}/>
      {loading  ?
          <>
            <DashboardLoader/>
            <ProjectLoader/>
          </>
          : <div>
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
        quantity={files.length}
        />
      </div>
      <div className={styles.files}>


        {(showFiles ? files : files.slice(0, 5)).map(item => (<File
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            canEdit={false}
            basePath={''}
            item={item}
        />))}
      </div>
      {files.length > 5 && <div className={styles.moreFiles}>
        <a onClick={() => showFiles ? setShowAllFiles(false) : setShowAllFiles(true)}>
          <img className={showFiles ? styles.hide : null} src="img/icons/arrowDown.svg" alt=''/>{showFiles ? <span>Скрыть</span> : <span>Показать еще</span>}
        </a>
      </div>}
      </div>}
      </>}
    </div>

      <FileEditModal isOpen={key === 'editFile'} catalog={currentEditCatalog} onRequestClose={() => dispatch(modalClose())}/>

      <Footer/>
    </Layout>
  )
}

export default withAuthSync(Search)

