import {
  catalogCopy, catalogPaste,
  deleteCatalog,
  fetchCatalogItemRequest,
  fetchCatalogList, fetchCatalogListByIds, fetchPublicCatalogItemRequest, fetchPublicCatalogList, resetCatalogItem,
  resetCatalogList, resetFilesFromDropzone,
  setCatalogPage,
  setCurrentCatalogId, setFilesFromDropZone
} from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import {
  confirmOpen,
  createFolderOpen, createFolderPublicLinkOpen,
  editFileOpen, mediaLinkPublicModalOpen,
  modalClose,
  uploadFilesModalOpen
} from "components/Modal/actions";
import {deleteTag} from "components/tags/Tag/actions";
import BreadCrumbs from "components/ui/Breadcrumbs";
import Button from "components/ui/Button";
import ButtonDots from "components/ui/ButtonDots";
import CreateFolder from "components/catalog-page/components/CreateFolder";
import FileEditModal from "components/FileEditModal";
import UserModal from "pages/users/components/UserModal";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {FileActionType, IRootState} from "types";
import {getAuthServerSide, logout} from "utils/auth";
import {pluralize} from "utils/formatters";
import styles from 'pages/catalog-public/[hash]/index.module.scss'
import File, {FileShowType, DraggableFile} from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import {useRouter} from 'next/router'
import Draggable from 'react-draggable';
import {useDispatch, useSelector} from 'react-redux'
import ProjectLoader from "components/ContentLoaders/projectLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import CatalogDropZone from "components/CatalogDropZone";
import {NextSeo} from 'next-seo'
import PasteCatalogItem from 'components/catalog-page/components/PasteCatalogItem'
import MediaLinkPublicModal from 'components/MediaLinkPublicModal'
import request from 'utils/request'
import useInterval from 'react-useinterval'
import {fetchJobListByIds} from 'components/jobs/actions'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import CatalogSortToolbar from 'components/CatalogSortToolbar'
import CatalogActionsToolbar from 'components/CatalogActionsToolbar'
import {getPasteFileDescription, getPasteFileTitle} from 'utils/copyPasteFile'
import {toast} from "react-toastify";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import CatalogPublicLinkModal from 'components/CatalogPublicLinkModal'
import UploadFilesModal from 'components/catalog-page/components/UploadFilesModal'
interface Props{
  public?: boolean
  host?: string
}
const CatalogPage = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const modalKey = props.public ? null : useSelector((state: IRootState) => state.ModalReducer.modalKey)
  const [currentEditCatalog, setCurrentEditCatalog] = useState(null)
  const items = useSelector((state: IRootState) => state.catalog.list)
  const listLoading = useSelector((state: IRootState) => state.catalog.listLoading)
  const currentLoading = useSelector((state: IRootState) => state.catalog.currentLoading)
  const totalItems = useSelector((state: IRootState) => state.catalog.listTotal)
  const basePath = useSelector((state: IRootState) => state.catalog.basePath)
  const currentCatalogItem = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
  const page = useSelector((state: IRootState) => state.catalog.page)
  const paths = router.query.paths as string[] || []
  const hash = router.query.hash as string;
  const filesFromDropZone = useSelector((state: IRootState) => state.catalog.filesFromDropZone)
  const updateIds = useSelector((state: IRootState) => state.catalog.updateIds)

  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [dragOverId, setDragOverId] = useState(null);
  const mousePositionRef = useRef(null);
  useInterval(() => {
    if (updateIds.length > 0) {
      const id = paths[paths.length - 1]
      dispatch(fetchCatalogListByIds(id, updateIds));
    }

  }, 3000);
  const handleMouseMove = (e) => {
    mousePositionRef.current = { x: e.pageX, y: e.pageY };
  }
  const handleScrollNext = () => {
    const id = paths[paths.length - 1]
    const newPage = page + 1;
    dispatch(setCatalogPage(newPage))
    if(props.public) {
      dispatch(fetchPublicCatalogList(id, hash, newPage, 30, sortField, sortOrder))
    }else{
      dispatch(fetchCatalogList(id, newPage, 30, sortField, sortOrder))

    }
  }

  useEffect(() => {
    const id = paths[paths.length - 1]
    dispatch(resetCatalogList())
    if(props.public){
      dispatch(fetchPublicCatalogList(id, hash, 1, 70))

      dispatch(fetchPublicCatalogItemRequest(id, {hash}));
      dispatch(setCurrentCatalogId(id));
    }else{
      dispatch(fetchCatalogList(id, 1, 30))
      dispatch(fetchCatalogItemRequest(id))
      dispatch(setCurrentCatalogId(parseInt(id, 10)))
    }


    return () => {
      dispatch(resetCatalogList());
      dispatch(resetCatalogItem());
    }
  }, [router.query.paths])


  const handleEditClick = useCallback((item) => {
    if (item.entryType === 'file') {
      setCurrentEditCatalog(item);
      dispatch(editFileOpen());
    } else {
      setCurrentEditCatalog(item);
      dispatch(createFolderOpen());
    }
  }, [currentCatalogItem])

  const handlePublicLinkClick = useCallback((item) => {
    if (item.entryType === 'file') {
      setCurrentEditCatalog(item);
      dispatch(mediaLinkPublicModalOpen());
    }else{
      setCurrentEditCatalog(item);
      dispatch(createFolderPublicLinkOpen());

    }
  }, [currentCatalogItem])


  const handleCreateFolderClick = (item) => {
    setCurrentEditCatalog(null);
    dispatch(createFolderOpen());

  }
  const handleDeleteClick = (item) => {
    dispatch(confirmOpen({
      title: `Вы уверены, что хотите удалить ${item.entryType === 'file' ? 'файл' : 'каталог'}?`,
      description: item.name,
      confirmColor: 'red',
      confirmText: 'Удалить',
      onConfirm: () => {
        dispatch(deleteCatalog(item?.id));
      }
    }));
  }
  const handleDropZoneDrop = (files) => {
    dispatch(setFilesFromDropZone(files));
    dispatch(uploadFilesModalOpen())
  }
  const handleCloseFilesUploadModal = () => {
    dispatch(resetFilesFromDropzone());
  }
  const handleUploadFiles = () => {
    dispatch(uploadFilesModalOpen())
  }
  const handleChangeSort = (sortField, sortOrder) => {
    const id = paths[paths.length - 1]
    setSortField(sortField);
    setSortOrder(sortOrder);
    dispatch(resetCatalogList())
    if(props.public){
      dispatch(fetchPublicCatalogList(id, hash,1, 30, sortField, sortOrder))
    }else{
      dispatch(fetchCatalogList(id, 1, 30, sortField, sortOrder))
    }


  }
  const handleSelect = (id, check) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);

    }
  }
  const handleUnSelectAll = () => {
    setSelectedIds([]);
  }

  const handleActionClick = (action: FileActionType) => {
    switch (action) {
      case FileActionType.Edit:
        if (currentCatalogItem?.entryType === 'project') {
          router.push(`/project/edit/${currentCatalogItem.id}`)
        } else {
          setCurrentEditCatalog(currentCatalogItem);
          dispatch(createFolderOpen());
        }
        break;
      case FileActionType.PublicLink:
       setCurrentEditCatalog(currentCatalogItem);
        dispatch(createFolderPublicLinkOpen());
        break;
      case FileActionType.Cut:
        dispatch(catalogCopy(currentCatalogItem));
        break;
      case FileActionType.Paste:
        try {
          const copyItems = JSON.parse(localStorage.getItem('copyCatalog'));

          dispatch(confirmOpen({
            title: getPasteFileTitle(copyItems),
            description: getPasteFileDescription(copyItems, currentCatalogItem),
            confirmText: 'Переместить',
            onConfirm: () => {
              dispatch(catalogPaste(currentCatalogItem.id));
            }
          }));
        } catch (e) {

        }
        break;
      case FileActionType.Delete:
        dispatch(confirmOpen({
          title: `Вы уверены, что хотите удалить ${currentCatalogItem?.entryType === 'project' ? 'Проект' : 'Папку'}?`,
          description: currentCatalogItem.name,
          confirmColor: 'red',
          confirmText: 'Удалить',
          onConfirm: () => {
            dispatch(deleteCatalog(currentCatalogItem?.id));
          }
        }));
        break;
    }
  }
  const actions = (() => {
    let actions = [
      ...(currentCatalogItem?.canEdit ? [{name: 'Публичная ссылка', key: FileActionType.PublicLink}] : []),
      ...(currentCatalogItem?.canEdit ? [{name: 'Редактировать', key: FileActionType.Edit}] : []),
      ...((currentCatalogItem?.canEdit && currentCatalogItem?.entryType !== 'project') ? [{
        name: 'Вырезать',
        key: FileActionType.Cut
      }] : []),
      ...((currentCatalogItem?.canEdit && currentCatalogItem?.entryType !== 'file' && (typeof localStorage !== 'undefined' && localStorage.getItem('copyCatalog'))) ? [{
        name: 'Вставить',
        key: FileActionType.Paste
      }] : []),
      ...(currentCatalogItem?.canEdit ? [{name: 'Удалить', key: FileActionType.Delete}] : []),
    ];
    return actions;

  })()
  const handleDragEnd = (result) => {
    setDragOverId(null);
    const destId = result?.combine?.draggableId ? parseInt(result?.combine?.draggableId, 10) : null
    const sourceId = result?.draggableId ? parseInt(result?.draggableId, 10) : null
    if(!destId || !sourceId){
      return;
    }
    if(sourceId === destId){
      return;
    }
    const sourceItem = items.find(i => i.id === sourceId);
    const destItem = items.find(i => i.id === destId);
    const copyItems = [sourceItem];


    if(!sourceItem || !destItem){
      return;
    }
    if(destItem.entryType !== 'folder'){
      return;
    }
    dispatch(confirmOpen({
      title: getPasteFileTitle(copyItems),
      description: getPasteFileDescription(copyItems, destItem),
      confirmText: 'Переместить',
      onConfirm: () => {
        dispatch(catalogPaste(destItem.id, null, sourceId));
      }
    }));
  }
  const handleDragUpdate = (p) => {
    const { combine, draggableId } = p;
    const newDragOverId = combine ? combine?.draggableId : combine;
    function getOffset( el ) {
      var _x = 0;
      var _y = 0;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: _y, left: _x };
    }

    if(!newDragOverId) {
      setDragOverId(null);
      return;
      if(!mousePositionRef.current){
        setDragOverId(null);
        return;
      }

      const elDragabble = document.getElementById(`catalog-item-${draggableId}`);
      const offset =  getOffset(elDragabble);
      const mouseOffset =  mousePositionRef.current;
      const adding = 30;
      const mouseOffsetY = mouseOffset.y + adding;
      const isOver =    offset.left<=mouseOffset.x && offset.left + elDragabble.offsetWidth > mouseOffset.x &&
        offset.top <= mouseOffset.y + 40 && offset.top + elDragabble.offsetHeight > mouseOffsetY;
      if(!isOver){
        setDragOverId(null);
      }
    }else {
      setDragOverId(newDragOverId);
    }
  }
  const initialIem = currentCatalogItem ?? props.initialVideo
  return (
    <Layout>

      {initialIem && <NextSeo title={initialIem.name}
                              description={'Вы можете хранить и передавать коллегам файлы и папки, редактировать видео-контент. Медиатека – это облачный сервис, который позволяет не хранить файлы локально, снижая риски потерять важные файлы.'}
                              openGraph={{
                                        type: 'website',
                                        site_name: `Медиатека — простой и безопасный доступ к контенту`,
                                        url: `https://${props.host}${router.asPath}`,
                                        title: initialIem.name,
                                        description: `Вы можете хранить и передавать коллегам файлы и папки, редактировать видео-контент. Медиатека – это облачный сервис, который позволяет не хранить файлы локально, снижая риски потерять важные файлы.`,
                                      }}

      />}
      {!props.public && <Header {...props}>
        {currentCatalogItem && currentCatalogItem.canEdit &&
        <div className={styles.create} data-tour="create-folder"><Button folder transparent textDarkGrey btnDarkGrey type="button"
                                               onClick={handleCreateFolderClick}>Создать папку</Button></div>}
        {currentCatalogItem && currentCatalogItem.canEdit &&
        <div className={styles.download} data-tour="create-file"><Button size='6px 16px' green visiblePlus btnWhite type="button"
                                                 onClick={handleUploadFiles}><span>Загрузить файл</span></Button></div>}
      </Header>}
      {props.public && <Header {...props}/>}

      <div className={styles.root}>
        <div className={styles.head}>
          <div className={styles.title}>{currentCatalogItem?.name}</div>
          {!props.public && currentCatalogItem && <div className={styles.favorite}>
              <FavoriteCatalogButton item={currentCatalogItem} style={'video'}/>
          </div>}
          <div className={styles.image}>
            {currentCatalogItem && currentCatalogItem.canEdit && <ButtonDots
                options={actions} onClick={handleActionClick}/>}
          </div>
        </div>
        <BreadCrumbs items={[...(!props.public ? [{name: 'Главная', link: '/'}]: []), ...(currentCatalogItem?.parents ? currentCatalogItem?.parents.map(i => props.public ? {...i, link: i.link.replace('catalog', `catalog-public/${hash}`)} : i) : [])]}/>
        {items.length > 0 &&
        <div className={styles.toolbar}>
            <div
                className={styles.duration}>{totalItems} {pluralize(totalItems, 'материал', 'материала', 'материалов')}</div>
          {selectedIds.length > 0 ?
            <CatalogActionsToolbar selectedIds={selectedIds} onUnSelectAll={handleUnSelectAll}/> :
            <CatalogSortToolbar sortOrder={sortOrder} sortField={sortField} onChange={handleChangeSort}/>}
        </div>}
        {items.length > 0 ?

          <InfiniteScroll
            dataLength={items.length}
            next={handleScrollNext}
            loader={<div></div>}
            style={{overflow: "inherit"}}
            hasMore={totalItems !== items.length}
            className={styles.scroll}
          >


            <div
              className={styles.files} onMouseMove={handleMouseMove} onMouseLeave={() => mousePositionRef.current = null}>
              {items.map((item, index) => (<File
                key={`${item.id}`}
                index={index}
                dataTour={index == 0 ? 'catalog-menu' : null}
                isSelected={selectedIds.includes(item.id)}
                onSelect={(check) => handleSelect(item.id, check)}
                userRole={props.user?.role}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onPublicLinkClick={handlePublicLinkClick}
                showType={FileShowType.Catalog}
                canEdit={currentCatalogItem?.canEdit}
                dragOverId={dragOverId}
                item={item}
                publicHash={hash}
              />))}
            </div>

          </InfiniteScroll>
          : !listLoading ?
            <a className={styles.noFiles} onClick={currentCatalogItem?.canEdit ? handleUploadFiles : null}>
              <div className={styles.text}>
                <div className={styles.firstText}>В эту папку пока никто ничего не загрузил. Подождем...</div>
                <div className={styles.secondText}>В папках можно хранить любое фото, видео, аудио или текстовые
                  материалы
                </div>
                {currentCatalogItem?.canEdit &&
                <div className={styles.iconText}><img src="/img/icons/files.svg" alt=''/><span>Перенесите сюда файл или нажмите для выбора файла на компьютере</span>
                </div>}
              </div>
              <div className={styles.images}>
                <img className={styles.clock} src="/img/icons/clock.svg" alt=''/>
                <img className={styles.human} src="/img/icons/human.svg" alt=''/>
                <img className={styles.plant} src="/img/icons/plant.svg" alt=''/>
              </div>
            </a> : items.length === 0 && listLoading ? <ProjectLoader/> : null
        }
      </div>

      <Footer/>
      {modalKey === 'createFolder' && <CreateFolder isOpen={modalKey === 'createFolder'}
                                                    onRequestClose={() => dispatch(modalClose())}
                                                    catalog={currentEditCatalog}/>}

      <FileEditModal isOpen={modalKey === 'editFile'} catalog={currentEditCatalog}
                     onRequestClose={() => dispatch(modalClose())}/>
      {modalKey === 'uploadFiles' &&
      <UploadFilesModal isOpen={modalKey === 'uploadFiles'} filesFromDropZone={filesFromDropZone}
                        onClose={handleCloseFilesUploadModal}/>}

      {(!modalKey || modalKey === 'uploadFiles') && <CatalogDropZone onDrop={handleDropZoneDrop}/>}
      {modalKey === 'pasteCatalogItemDuplicate' &&
      <PasteCatalogItem onRequestClose={() => dispatch(modalClose())} isOpen={true} catalog={currentCatalogItem}/>}
      {modalKey === 'mediaLinkPublic' &&
      <MediaLinkPublicModal isOpen={true} file={currentEditCatalog} onRequestClose={() => dispatch(modalClose())}/>}
      {currentEditCatalog && modalKey && <CatalogPublicLinkModal catalog={currentEditCatalog} isOpen={modalKey === 'createFolderPublicLink'} onRequestClose={() => dispatch(modalClose())}/>}
    </Layout>
  )
}



export default CatalogPage
