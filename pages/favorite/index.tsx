import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import {confirmOpen, editFileOpen, modalClose} from "components/Modal/actions";
import {
    fetchCatalogFilesFavorite,
    fetchCatalogFoldersFavorite,
    fetchCatalogProjectsFavorite,
    resetCatalogFavorite
} from "components/favorite/actions";
import {fetchTagCategoryList} from "components/tags/TagCategory/actions";
import {useRouter} from "next/router";
import FileEditModal from "components/FileEditModal";
import {useCallback, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {IRootState, ITagCategoryType} from "types";
import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import {TagSelect} from "components/dashboard/TagSelect";
import Project from "components/dashboard/Project";
import Quantity from "./components";
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import {useDispatch, useSelector} from 'react-redux'
import DashboardLoader from "components/ContentLoaders/dashboardLoader";
import NoFavorite from 'pages/favorite/components/NoFavorite'


const FavoritePage = (props) => {
    const dispatch = useDispatch();
    const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
    const router = useRouter()
    const tagCategories = useSelector((state: IRootState) => state.tagCategory.list)
    const projects = useSelector((state: IRootState) => state.favorite.projects)
    const projectsLoading = useSelector((state: IRootState) => state.favorite.listProjectsLoading)
    const filesLoading = useSelector((state: IRootState) => state.favorite.listFilesLoading)
    const foldersLoading = useSelector((state: IRootState) => state.favorite.listFoldersLoading)
    const loading = projectsLoading || filesLoading || foldersLoading;
    const files = useSelector((state: IRootState) => state.favorite.files)
    const folders = useSelector((state: IRootState) => state.favorite.folders)
    const projectsTotal = useSelector((state: IRootState) => state.favorite.projectsTotal)
    const filesTotal = useSelector((state: IRootState) => state.favorite.filesTotal)
    const foldersTotal = useSelector((state: IRootState) => state.favorite.foldersTotal)

    const [currentEditCatalog, setCurrentEditCatalog] = useState(null)

    const [showProjects, setShowAllProjects] = useState(false)
    const [showFiles, setShowAllFiles] = useState(false)
    const [showFolders, setShowAllFolders] = useState(false)
    const [pageFiles, setPageFiles] = useState(1);
    const [pageProjects, setPageProjects] = useState(1);
    const [pageFolders, setPageFolders] = useState(1);
    const [tags, setTags] = useState([]);
    const [isInit, setIsInit] = useState(false)

    const limitFiles = 30;
    const limitProjects = 30;
    const limitFolders = 30;
    const { query } = router.query;
    console.log("query", query);
    useEffect(() => {

        dispatch(resetCatalogFavorite());
        dispatch(fetchTagCategoryList(ITagCategoryType.Project));
        dispatch(fetchCatalogProjectsFavorite( {limit: limitProjects}));
        dispatch(fetchCatalogFilesFavorite( { limit: limitFiles }));
        dispatch(fetchCatalogFoldersFavorite( { limit: limitFiles }));
    }, [])
    useEffect(() => {
        if(projectsTotal > 0){
            setIsInit(true);
        }
    }, [projectsTotal])

    const handleTagChangeTags = (tags) => {
        console.log("handleTagChangeTags");
        setTags(tags);
        setPageFiles(1);
        setPageProjects(1);
        dispatch(resetCatalogFavorite());
        dispatch(fetchCatalogProjectsFavorite( { ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: 1, limit: limitProjects }));
        dispatch(fetchCatalogFilesFavorite( { ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: 1, limit: limitProjects }));
        dispatch(fetchCatalogFoldersFavorite( { ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: 1, limit: limitFolders }));
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
    const handleShowFiles = () => {
        if(showFiles){
            setShowAllFiles(false)
        }else{
            setShowAllFiles(true)
            if(pageFiles === 1){
                setPageFiles(pageFiles + 1)
                dispatch(fetchCatalogFilesFavorite({ ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageFiles + 1, limit: limitFiles }));
            }
        }

    }

    const handleShowFolders = () => {
        if(showFiles){
            setShowAllFolders(false)
        }else{
            setShowAllFolders(true)
            if(pageFolders === 1){
                setPageFolders(pageFolders + 1)
                dispatch(fetchCatalogFoldersFavorite( { ...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageFolders + 1, limit: limitFolders }));
            }
        }

    }
    const handleScrollNextFiles = () => {
        setPageFiles(pageFiles + 1)
        dispatch(fetchCatalogFilesFavorite( {...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageFiles + 1, limit: limitFiles }));
    }

    const handleScrollNextFolders = () => {
        setPageFiles(pageFolders + 1)
        dispatch(fetchCatalogFoldersFavorite( {...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageFolders + 1, limit: limitFolders }));
    }

    const handleShowProjects = () => {
        if(showProjects){
            setShowAllProjects(false)
        }else{
            setShowAllProjects(true)
            if(pageProjects === 1){
                setPageProjects(pageProjects + 1)
                dispatch(fetchCatalogProjectsFavorite( {...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageProjects + 1, limit: limitProjects }));
            }
        }

    }
    const handleScrollNextProjects = () => {
        setPageProjects(pageProjects + 1)
        dispatch(fetchCatalogProjectsFavorite( {...(tags.length > 0 ? { tags: tags.map(tag => tag.id).join(',') } : {}), page: pageProjects + 1, limit: limitProjects }));
    }
    return (
        <Layout>
            <Header {...props} favoriteValue={query as string} />
            <div className={styles.root}>
                {!loading && filesTotal === 0 && projectsTotal === 0  && foldersTotal === 0 && tags.length === 0 &&
                <NoFavorite/>}
                { (filesTotal > 0 || projectsTotal > 0) &&
                  <div
                    className={styles.titleFavorite}>Избранное
                  </div>}
                {isInit && <TagSelect items={tagCategories} selectedTags={tags} onChangeSelectedTags={handleTagChangeTags}/>}

                {loading && filesTotal === 0 && projectsTotal === 0 && foldersTotal === 0 && <DashboardLoader/>}
                {projectsTotal > 0 && <>
                  <div className={styles.titleContainer}>
                    <div className={styles.title}>Проекты</div>
                    <Quantity
                      quantity={projectsTotal}
                    />
                  </div>
                  <InfiniteScroll
                    dataLength={projects.length}
                    next={handleScrollNextProjects}
                    loader={<div></div>}
                    hasMore={showProjects && projectsTotal !== projects.length}
                    className={styles.scroll}
                  >
                  <div className={styles.projects}>
                      {(showProjects ? projects : projects.slice(0, 5)).map(item => (<Project
                              item={item}
                          />
                      ))}
                  </div>
                  </InfiniteScroll>
                    {projectsTotal > 5 && <div className={styles.more}>
                      <a onClick={handleShowProjects}>
                        <img className={showProjects ? styles.hide : null} src="img/icons/arrowDown.svg"
                             alt=''/>{showProjects ? <span>Скрыть</span> : <span>Показать еще</span>}
                      </a>
                    </div>}
                </>}


                {foldersTotal > 0 && <>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Папки</div>
                        <Quantity
                          quantity={foldersTotal}
                        />
                    </div>
                    <div className={styles.files}>
                        <InfiniteScroll
                          dataLength={folders.length}
                          next={handleScrollNextFolders}
                          loader={<div></div>}
                          style={{overflow: "inherit"}}
                          hasMore={showFolders && foldersTotal !== folders.length}
                          className={styles.scroll}
                        >
                            {(showFolders ? folders : folders.slice(0, 5)).map(item => (<File
                              onEditClick={handleEditClick}
                              onDeleteClick={handleDeleteClick}
                              canEdit={false}
                              showFavorite={true}
                              additionalInfo={false}
                              basePath={''}
                              item={item}
                            />))}

                        </InfiniteScroll>
                    </div>
                    {foldersTotal > 5 && <div className={styles.moreFiles}>
                        <a onClick={handleShowFolders}>
                            <img className={showFolders ? styles.hide : null} src="img/icons/arrowDown.svg"
                                 alt=''/>{showFolders ? <span>Скрыть</span> : <span>Показать еще</span>}
                        </a>
                    </div>}
                </>}

                {filesTotal > 0 && <>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Файлы</div>
                        <Quantity
                          quantity={filesTotal}
                        />
                    </div>
                    <div className={styles.files}>
                        <InfiniteScroll
                          dataLength={files.length}
                          next={handleScrollNextFiles}
                          loader={<div></div>}
                          style={{overflow: "inherit"}}
                          hasMore={showFiles && filesTotal !== files.length}
                          className={styles.scroll}
                        >
                            {(showFiles ? files : files.slice(0, 5)).map(item => (<File
                              onEditClick={handleEditClick}
                              onDeleteClick={handleDeleteClick}
                              canEdit={false}
                              showFavorite={true}
                              additionalInfo={false}
                              basePath={''}
                              item={item}
                            />))}

                        </InfiniteScroll>
                    </div>
                    {filesTotal > 5 && <div className={styles.moreFiles}>
                        <a onClick={handleShowFiles}>
                            <img className={showFiles ? styles.hide : null} src="img/icons/arrowDown.svg"
                                 alt=''/>{showFiles ? <span>Скрыть</span> : <span>Показать еще</span>}
                        </a>
                    </div>}
                </>}
            </div>

            <FileEditModal isOpen={key === 'editFile'} catalog={currentEditCatalog}
                           onRequestClose={() => dispatch(modalClose())}/>

            <Footer/>
        </Layout>
    )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default FavoritePage

