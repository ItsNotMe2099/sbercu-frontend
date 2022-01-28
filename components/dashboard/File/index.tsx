import {catalogCopy, catalogPaste, createCatalog} from "components/catalog/actions";
import {useDetectOutsideClick} from "components/dashboard/TagSelect/useDetectOutsideClick";
import {confirmOpen} from "components/Modal/actions";
import ButtonDots from "components/ui/ButtonDots";
import Link from 'next/link'
import React, {useRef} from "react";
import {FileActionType, ICatalogEntry} from "types";
import {formatJobStatusName, formatSeconds, formatSize} from "utils/formatters";
import {getMediaPath, isAudio, isDocument, isImage, isVideo} from "utils/media";
import styles from './index.module.scss'
import cx from 'classnames'
import Dots from "components/svg/Dots";

import {useDispatch} from 'react-redux'
import {format} from 'date-fns'
import {Circle} from 'rc-progress'
import Cross from 'components/svg/Cross'
import LikeOutline from 'components/svg/LikeOutline'
import FavoriteCatalogButton from 'components/FavoriteCatalogButton'
import BreadCrumbs from 'components/ui/Breadcrumbs'
import {FileJobInfo} from 'components/file/FileJobInfo'
import SelectCheckbox from 'components/ui/SelectCheckbox'
import {DragSourceMonitor, useDrag} from 'react-dnd'
import {action} from 'typesafe-actions'
import {getPasteFileDescription, getPasteFileTitle} from 'utils/copyPasteFile'

interface Props {
  item: ICatalogEntry,
  isSelected?: boolean
  onClick?: (item) => void
  canEdit?: boolean
  onEditClick?: (item) => void
  onDeleteClick?: (item) => void
  onRestoreClick?: (item) => void
  onPublicLinkClick?: (item) => void
  onSelect?: (check) => void
  userRole?: string
  showType: FileShowType
}

export enum FileShowType {
  Catalog,
  Favorite,
  Search,
  SearchAutocomplete,
  MyFiles,
  Basket,
}



export default function File({
                               item,
                               userRole,
                               onDeleteClick,
                               onRestoreClick,
                               onPublicLinkClick,
                               onEditClick,
                               onClick,
                               canEdit,
                               showType,
                               ...props
                             }: Props) {
  const dispatch = useDispatch();

  const validActions = (() => {
    switch (showType) {
      case FileShowType.Catalog:
        return [FileActionType.Edit, FileActionType.Cut, FileActionType.Paste, FileActionType.Delete]
      case FileShowType.Basket:
        return [FileActionType.Restore, FileActionType.DeleteForever]
      case FileShowType.Search:
        return [];
      case FileShowType.SearchAutocomplete:
        return [];
      case FileShowType.MyFiles:
        return []
      case FileShowType.Favorite:
        return [];
    }
  })()
  const showFavorite = (() => {
    if(item.deletedAt){
      return false;
    }
    switch (showType) {
      case FileShowType.Catalog:
        return true;
      case FileShowType.Basket:
        return false;
      case FileShowType.Search:
        return false
      case FileShowType.SearchAutocomplete:
        return false
      case FileShowType.MyFiles:
        return true
      case FileShowType.Favorite:
        return true;
    }
  })()
  const showAdditionalFile = (() => {
    switch (showType) {
      case FileShowType.Catalog:
        return true;
      case FileShowType.Basket:
        return false;
      case FileShowType.Search:
        return false
      case FileShowType.SearchAutocomplete:
        return false
      case FileShowType.MyFiles:
        return true
      case FileShowType.Favorite:
        return true;
    }
  })()

  const showBreadcrumbs = (() => {
    switch (showType) {
      case FileShowType.Basket:
        return true;
      default:
        return false;
    }
  })()

  const actions = (() => {
    let actions = [
      ...(canEdit ? [{name: 'Редактировать', key: FileActionType.Edit}] : []),
      ...(canEdit ? [{name: 'Вырезать', key: FileActionType.Cut}] : []),
      ...(['admin', 'manager'].includes(userRole) ? [{name: 'Публичная ссылка', key: FileActionType.PublicLink}] : []),
      ...((canEdit && item.entryType !== 'file' && (typeof localStorage !== 'undefined' && localStorage.getItem('copyCatalog'))) ? [{name: 'Вставить', key: FileActionType.Paste}] : []),
      ...(canEdit ? [{name: 'Удалить', key: FileActionType.Delete}] : []),
      {name: 'Восстановить', key: FileActionType.Restore},
      {name: 'Удалить  навсегда', key: FileActionType.DeleteForever},
    ];
    actions = actions.filter(i => validActions.includes(i.key));
    if (actions.find(i => i.key === FileActionType.Paste) && (typeof localStorage === 'undefined' || !localStorage.getItem('copyCatalog'))) {
      actions = actions.filter(i => i.key !== FileActionType.Paste);
    }
    return actions;

  })()

  const getIconByType = (type, fileName) => {
    if(type === 'folder'){
      return '/img/icons/folder.svg'
    }
    if(type === 'video'){
      return '/img/icons/file_types/mp4.svg'
    }
    const ext = fileName?.split('.')?.pop() || '';

    switch (ext?.toLowerCase()){
      case 'ppt':
      case 'pptx':
        return '/img/icons/file_types/ppt.svg'
      case 'pdf':
        return '/img/icons/file_types/pdf.svg'
      case 'doc':
      case 'docx':
        return '/img/icons/file_types/doc.svg'
      case 'xls':
      case 'xlsx':
        return '/img/icons/file_types/xls.svg'
      case 'jpeg':
      case 'jpg':
        return '/img/icons/file_types/jpg.svg'
      case 'png':
        return '/img/icons/file_types/png.svg'
      case 'exe':
        return '/img/icons/file_types/exe.svg'
      case 'mp3':
        return '/img/icons/file_types/mp3.svg'
      case 'aac':
        return '/img/icons/file_types/aac.svg'
      case 'zip':
        return '/img/icons/file_types/zip.svg'

    }
    switch (type) {
       case 'audio':
        return '/img/icons/audio.svg'
      case 'document':
        return '/img/icons/document.svg'
      case 'image':
        return '/img/icons/document.svg'
    }

  }


  const handleActionClick = (action: FileActionType) => {
    switch (action) {
      case FileActionType.Edit:
        if (onEditClick) {
          onEditClick(item)
        }
        break;
      case FileActionType.PublicLink:
        if (onPublicLinkClick) {
          onPublicLinkClick(item)
        }
        break;
      case FileActionType.Cut:
        dispatch(catalogCopy(item));
        break;
      case FileActionType.Paste:
        try {
          const copyItems = JSON.parse(localStorage.getItem('copyCatalog'));
          dispatch(confirmOpen({
            title: getPasteFileTitle(copyItems),
            description: getPasteFileDescription(copyItems, item),      confirmText: 'Переместить',
            onConfirm: () => {
              dispatch(catalogPaste(item.id));
            }
          }));
        } catch (e) {

        }
        break;
      case FileActionType.Delete:
        if (onDeleteClick) {
          onDeleteClick(item)
        }
        break;
      case FileActionType.Restore:
        if (onRestoreClick) {
          onRestoreClick(item)
        }
        break;
      case FileActionType.DeleteForever:
        if (onDeleteClick) {
          onDeleteClick(item)
        }
        break;
    }
  }

  const getFileLink = () => {
    const source = item.media?.fileName;

    if(item.entryType === 'folder') {
      return `/catalog/${item.id}`;
    }

    if ( item.entryType === 'file' && isAudio(source) || isVideo(source) || isDocument(source) || isImage(source)) {
      return `/file/${item.id}`;
    }

    return getMediaPath(item.media?.fileName) ? `${getMediaPath(item.media?.fileName)}?download=1` : '';

  }
  const getDetailsText = () => {

  }
  const getMediaSize = () => {
    if (item.entryType === 'file' && item.media?.type === 'video' && item.media.videoElements?.length > 0) {
      return item.media.videoElements.find(i => i.quality === '1080p')?.size || item.media.size;
    } else if (item.entryType === 'file') {
      return item.media.size;
    }
  }
  const handleClick = (item) => {
    if (onClick) {
      onClick(item);
    }
  }
  const showDots = actions.length > 0;

  const noop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  console.log("item.deletedAt ", item.deletedAt);
  return (
    <Link href={getFileLink()}>
      <a className={cx(styles.root, {
        [styles.withDots]: showDots,
        [styles.isChecked]: props.isSelected,
        [styles.deleted]: !!item.deletedAt
      })} onClick={item.deletedAt ? noop : handleClick}
         target={item.entryType === 'file' && item.media?.type !== 'video' ? 'blank' : ''}>
        <div className={styles.image}><img src={getIconByType(item.entryType === 'file' ? item.media?.type : 'folder', item.media?.filePath)}
                                           alt=''/></div>

        <div className={styles.inner}>
          <div className={styles.title}>
            {item.name}
          </div>
          {item.highlight?.fileExtractedText && <div className={styles.highlight}>Найдено в содержимом</div>}
          <div className={styles.bottom}>
            <div className={styles.text}>{item.createdAt ? format(new Date(item.createdAt), 'dd.MM.yyy') : ''}</div>
            {item.deletedAt && <>
                <div className={styles.separator}/>
                <div
                    className={styles.text}>Удалено: {item.deletedAt ? format(new Date(item.deletedAt), 'dd.MM.yyy HH:mm') : ''}</div>
            </>}
            {item.presenters?.length > 0 && <div className={styles.separator}></div>}
            {item.presenters?.length > 0 && <div className={styles.text}>{item.presenters.join(', ')}</div>}

            {showAdditionalFile && item.entryType === 'file' && item.media ?
              <div className={styles.additional}>
                <div className={styles.separator}></div>
                {item.media.size && <div className={styles.text}>{formatSize(getMediaSize())}</div>}

                {/*<div className={styles.separator}></div>
            <div className={styles.text}>{props.length}</div>*/}
              </div>
              :
              null}
          </div>
          {(item.parents && showBreadcrumbs) && <BreadCrumbs className={styles.breadcrumbs}
                                                                   items={(item?.parents || []).map(i => ({
                                                                     link: `/catalog/${i.id}`,
                                                                     name: i.name,
                                                                     deleted: !!i.deletedAt
                                                                   })).splice(0, item?.parents?.length - 1)}/>}


        </div>
          {item?.media?.lastJob && item?.media?.lastJob.state !== 'finished' && <div className={styles.jobInfo}><FileJobInfo item={item} /></div>}


        {(canEdit && props.onSelect) &&
        <div className={cx(styles.checkbox, {[styles.isChecked]: props.isSelected})}><SelectCheckbox
            isChecked={props.isSelected} onChange={(check) => props.onSelect(check)}/></div>}

        {showFavorite &&
        <div className={cx(styles.like, {[styles.noLike]: !item.inFavorites})}><FavoriteCatalogButton item={item}
                                                                                                      style={'catalog'}/>
        </div>}
        {showDots && <div className={styles.dots}><ButtonDots
            onClick={handleActionClick}
            options={actions}
        /></div>}

      </a>
    </Link>
  )
}

File.defaultProps = {

}
export const DraggableFile = (props: Props) => {
  const {item} = props;
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: item.id + '',
    item: item,
    end: (item, monitor) => {

    },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }))

  console.log("collected", collected);
   return ( <div ref={drag} style={{...collected}} >
      <File {...props}/>
    </div>
  )

}