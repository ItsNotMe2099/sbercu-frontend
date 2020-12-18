import { use } from "ast-types";
import { fetchCatalogProjects, fetchMyUploadedFiles } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, editFileOpen, modalClose } from "components/Modal/actions";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import FileEditModal from "pages/catalog/components/FileEditModal";
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
  const myUploadedFiles = useSelector((state: IRootState) => state.catalog.myUploadedFilesList)
  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)

  const [isShow, setIsShow] = useState(false)
  const [showFiles, setShowAllFiles] = useState(false)
  useEffect(() => {

    dispatch(fetchMyUploadedFiles({}));
  }, [])

  const handleEditClick = useCallback((item) => {
    setCurrentEditCatalog(item);
    dispatch(editFileOpen());

  }, [])
  const handleDeleteClick = (item) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить файл?',
      description: item.name,
      confirmText: 'Удалить',
      onConfirm: () => {
      }
    }));
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
            quantity={myUploadedFiles.length}
        />
      </div>
      <div className={styles.files}>
        {(showFiles ? myUploadedFiles : myUploadedFiles.slice(0, 5)).map(item => (<File
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            basePath={''}
            item={item}
        />))}
      </div>
      {myUploadedFiles.length > 5 && <div className={styles.moreFiles}>
        <a onClick={() => showFiles ? setShowAllFiles(false) : setShowAllFiles(true)}>
          <img className={showFiles ? styles.hide : null} src="img/icons/arrowDown.svg" alt=''/>{showFiles ? <span>Скрыть</span> : <span>Показать еще</span>}
        </a>
      </div>}
    </div>
    <Footer/>
      <FileEditModal isOpen={key === 'editFile'} catalog={currentEditCatalog} onRequestClose={() => dispatch(modalClose())}/>

    </Layout>
  )
}

export default withAuthSync(Profile)
