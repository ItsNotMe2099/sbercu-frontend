import {
  deleteCatalog,
  fetchCatalogItem,
  fetchCatalogList,
  setCurrentCatalogId
} from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import {
  confirmOpen,
  createFolderOpen,
  editFileOpen,
  modalClose,
  uploadFilesModalOpen
} from "components/Modal/actions";
import { deleteTag } from "components/tags/Tag/actions";
import BreadCrumbs from "components/ui/Breadcrumbs";
import Button from "components/ui/Button";
import ButtonDots from "components/ui/ButtonDots";
import CreateFolder from "pages/catalog/components/CreateFolder";
import FileEditModal from "components/FileEditModal";
import UserModal from "pages/users/components/UserModal";
import { useCallback, useEffect, useState } from "react";
import { IRootState } from "types";
import { logout, withAuthSync } from "utils/auth";
import { pluralize } from "utils/formatters";
import styles from './index.module.scss'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import ProjectLoader from "components/ContentLoaders/projectLoader";
import UploadFilesModal from "./components/UploadFilesModal";

const Catalog = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const modalKey = useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)
  const items = useSelector((state: IRootState) => state.catalog.list)
  const listLoading = useSelector((state: IRootState) => state.catalog.listLoading)
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const totalItems = useSelector((state: IRootState) => state.catalog.listTotal)
  const basePath = useSelector((state: IRootState) => state.catalog.basePath)
  const currentCatalogItem = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const paths = router.query.paths as string[] || []

  useEffect(() => {
    const id = paths[paths.length - 1]
    console.log("PathId", id)
    dispatch(fetchCatalogList(id))
    dispatch(fetchCatalogItem(id))
    dispatch(setCurrentCatalogId(parseInt(id, 10)))
  }, [router.query.paths])

  const handleRootEditClick = useCallback(() => {

    console.log("EditClick", currentCatalogItem)
    if(currentCatalogItem?.entryType === 'project'){
      router.push(`/project/edit/${currentCatalogItem.id}`)
    }else{
      setCurrentEditCatalog(currentCatalogItem);
      dispatch(createFolderOpen());
    }
  }, [currentCatalogItem])
  const handleRootDeleteClick = () => {
    dispatch(confirmOpen({
      title: `Вы уверены, что хотите удалить ${currentCatalogItem?.entryType === 'project' ? 'Проект' : 'Папку'}?`,
      description: currentCatalogItem.name,
      confirmColor: 'red',
      confirmText: 'Удалить',
      onConfirm: () => {
        dispatch(deleteCatalog(currentCatalogItem?.id));
      }
    }));
  }
  const handleEditClick = useCallback((item) => {
    if(item.entryType === 'file') {
      setCurrentEditCatalog(item);
      dispatch(editFileOpen());
    }else {
      setCurrentEditCatalog(item);
      dispatch(createFolderOpen());
    }
  }, [currentCatalogItem])
  const handleDeleteClick = (item) => {
    dispatch(confirmOpen({
      title: `Вы уверены, что хотите удалить ${item.entryType === 'file' ? 'файл' : 'каталог'} ?`,
      description: item.name,
      confirmColor: 'red',
      confirmText: 'Удалить',
      onConfirm: () => {
        dispatch(deleteCatalog(item?.id));
      }
    }));
  }
  const handleUploadFiles = () => {
    dispatch(uploadFilesModalOpen())
  }
  return (
    <Layout>
    <Header>
      {currentCatalogItem && currentCatalogItem.canEdit && <div className={styles.create}><Button folder transparent textDarkGrey btnDarkGrey type="button" onClick={() => dispatch(createFolderOpen())}>Создать папку</Button></div>}
      {currentCatalogItem && currentCatalogItem.canEdit && <div className={styles.download}><Button size='6px 16px' green visiblePlus btnWhite type="button" onClick={handleUploadFiles}><span>Загрузить файл</span></Button></div>}
    </Header>
    <div className={styles.root}>
      <div className={styles.head}>
      <div className={styles.title}>{currentCatalogItem?.name}</div>
        <div className={styles.image}>
          {currentCatalogItem && currentCatalogItem.canEdit && <ButtonDots onEditClick={handleRootEditClick} onDeleteClick={handleRootDeleteClick}/>}
        </div>
      </div>
      <BreadCrumbs items={[{name: 'Главная', link: '/'}, ...(currentCatalogItem?.parents ? currentCatalogItem?.parents : [])]}/>
      {(items.length > 0  && !listLoading) &&  <div className={styles.duration}>{totalItems} {pluralize(totalItems, 'материал', 'материала', 'материалов')}</div>}
      {items.length !== 0 && !listLoading ?
      <div className={styles.files}>
        {items.map(item => (<File
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            basePath={basePath}
            canEdit={currentCatalogItem?.canEdit}
          item={item}
        />))}
      </div>
      : !listLoading ?
      <a className={styles.noFiles} onClick={handleUploadFiles}>
        <div className={styles.text}>
          <div className={styles.firstText}>В эту папку пока никто ничего не загрузил. Подождем...</div>
          <div className={styles.secondText}>В папках можно хранить любое фото, видео, аудио или текстовые материалы</div>
          <div className={styles.iconText}><img src="/img/icons/files.svg" alt=''/><span>Перенесите сюда файл или нажмите для выбора файла на компьютере</span></div>
        </div>
        <div className={styles.images}>
          <img className={styles.clock} src="/img/icons/clock.svg" alt=''/>
          <img className={styles.human} src="/img/icons/human.svg" alt=''/>
          <img className={styles.plant} src="/img/icons/plant.svg" alt=''/>
        </div>
      </a> : items.length === 0 ? <ProjectLoader/> : null
      }
    </div>

      <Footer/>
      <CreateFolder isOpen={modalKey === 'createFolder'}
               onRequestClose={() => dispatch(modalClose())} catalog={currentEditCatalog}/>
      <UploadFilesModal isOpen={modalKey === 'uploadFiles'} onRequestClose={() => dispatch(modalClose())}/>
      <FileEditModal isOpen={modalKey === 'editFile'} catalog={currentEditCatalog} onRequestClose={() => dispatch(modalClose())}/>

    </Layout>
  )
}


export default withAuthSync(Catalog)
