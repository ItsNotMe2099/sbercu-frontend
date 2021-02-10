import { use } from "ast-types";
import { fetchCatalogProjects, fetchMyUploadedFiles, resetCatalogList } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, editFileOpen, modalClose } from "components/Modal/actions";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import FileEditModal from "components/FileEditModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState } from "types";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import File from "components/dashboard/File";
import Quantity from "pages/dashboard/components";
import { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'

const Profile = (props) => {
  const user = props.user;
  const dispatch = useDispatch();
  const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const files = useSelector((state: IRootState) => state.catalog.myUploadedFilesList)
  const filesTotal = useSelector((state: IRootState) => state.catalog.myUploadedFilesListTotal)
  const filesLoading = useSelector((state: IRootState) => state.catalog.myUploadedFilesListLoading)

  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)


  const [isShow, setIsShow] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)
  const [pageFiles, setPageFiles] = useState(1);

  const limitFiles = 30;
  useEffect(() => {
    dispatch(resetCatalogList());
    dispatch(fetchMyUploadedFiles(user.id,{limit: limitFiles}));
    return () => {
      dispatch(resetCatalogList());
    }
  }, [])

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
        dispatch(fetchMyUploadedFiles( user.id, {  page: pageFiles + 1, limit: limitFiles }));
      }
    }

  }
  const handleScrollNextFiles = () => {
    setPageFiles(pageFiles + 1)
    dispatch(fetchMyUploadedFiles( user.id, { page: pageFiles + 1, limit: limitFiles }));
  }

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
        <div className={styles.value}>{user.email}</div>
      </div>
        <div className={styles.section}>
        <div className={styles.name}>Почта</div>
        <div className={styles.value}>{user.email}</div>
      </div>
        <div className={styles.section}>
        <div className={styles.name__name}>Имя</div>
        <div className={styles.value}>{user.firstName}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.name__surname}>Фамилия</div>
        <div className={styles.value}>{user.lastName}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.name}>ВШ ID</div>
        <div className={styles.value}>{user.virtualSchoolId}</div>
      </div>
      <a  className={styles.more} onClick={() => setIsShow(false)}>
          <img className={styles.image} src="img/icons/arrowDown.svg" alt=''/><span>Скрыть</span>
        </a>
      </>
        :
        <>
        <div className={styles.section}>
          <div className={styles.name__name}>Имя</div>
          <div className={styles.value}>{user.firstName}</div>
        </div>
        <div className={styles.section}>
          <div className={styles.name__surname}>Фамилия</div>
          <div className={styles.value}>{user.lastName}</div>
        </div>
        <div className={styles.section}>
          <div className={styles.name}>Почта</div>
          <div className={styles.value}>{user.email}</div>
        </div>
        <a className={styles.more} onClick={() => setIsShow(true)}>
          <img src="img/icons/arrowDown.svg" alt=''/><span>Показать еще</span>
        </a>
        </>}
        </div>
        {user.departmentTags.length > 0 && <div className={styles.tags}>
          <div>
            <div className={styles.title__tag}>Подразделение</div>
            {user.departmentTags.map(tag => <div className={styles.tag}>{tag.name}</div>)}
          </div>
        </div>}
      </div>

      {filesTotal > 0 && <>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Файлы загруженные мной</div>
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
    <Footer/>
      <FileEditModal isOpen={key === 'editFile'} catalog={currentEditCatalog} onRequestClose={() => dispatch(modalClose())}/>

    </Layout>
  )
}

export default withAuthSync(Profile)
