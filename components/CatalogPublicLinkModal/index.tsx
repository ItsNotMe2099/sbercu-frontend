import Modal from 'components/ui/Modal'
import { ICatalogEntry, IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {createMediaLinkPublic, createMediaLinkTemp, resetMediaLinkForm} from "../media-links/actions";
import {useEffect, useState} from "react";
import TextArea from "../ui/Inputs/TextArea";
import {deleteCatalog, resetCatalogForm, updateCatalogItemState} from 'components/catalog/actions'
import request from 'utils/request'
import Button from 'components/ui/Button'

import CopySvg from 'components/svg/CopySvg'
import Input from 'components/ui/Inputs/Input'
import InputCopy from 'components/ui/Inputs/InputCopy'
import {confirmOpen, createFolderPublicLinkOpen, modalClose} from 'components/Modal/actions'
import {toast} from 'react-toastify'


interface Props {
  catalog?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function CatalogPublicLinkModal(props: Props){
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [link, setLink] = useState(props.catalog.publicLink)
  const isProject = props.catalog.entryType === 'project'
  useEffect(() => {
    return () => {
      dispatch(resetCatalogForm())
    }
  }, []);
  const generateLink = async () => {

    const res = await request({
      url: `/api/catalog/public-link/${props.catalog.id}`,
      method: 'POST'
    });

    if(res.err){
      setError(res.data);
      return;
    }

    dispatch(updateCatalogItemState(props.catalog.id, res.data));
    setLink(res.data.publicLink);

  }
  const handleCreate = async (data) => {
    setLink('333');

    if(link) {
      dispatch(confirmOpen({
        title: 'Вы уверены, что хотите пересоздать публичную ссылку?',
        description: 'Доступ к папке по ссылке будет закрыт для всех с кем вы поделились.',
        confirmColor: 'green',
        confirmText: 'Пересоздать',
        onCancel: () => {
          dispatch(createFolderPublicLinkOpen());
        },
        onConfirm: async () => {
          generateLink();
          dispatch(createFolderPublicLinkOpen());
        }
      }));
    }else{
      generateLink();
    }
  }
  const handleDelete = async (data) => {

    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите удалить публичную ссылку?',
      description: 'Доступ к папке по ссылке будет закрыт для всех с кем вы поделились.',
      confirmColor: 'red',
      confirmText: 'Удалить',
      onCancel: () => {
        dispatch(createFolderPublicLinkOpen());
      },
      onConfirm: async () => {
        const res = await request({
          url: `/api/catalog/public-link/${props.catalog.id}`,
          method: 'DELETE'
        });

        if(res.err){
          setError(res.data);
          return;
        }

        setLink(null);
        dispatch(updateCatalogItemState(props.catalog.id, res.data));
        dispatch(modalClose());
        toast.success('Ссылка успешно удалена');
      }
    }));

  }
  const getLink = (link) => {
    if(typeof  window !== 'undefined' && link) {
      const host = window.location.protocol + "//" + window.location.host;
      return `${host}/catalog-public/${link}`;
    }
  }
  return (
    <Modal {...props} title={`Открыть доступ к просмотру ${isProject ? 'проекта' : 'папки'}`}>
      {link && <>
          <div className={styles.text}>Просмотр доступен всем, у кого есть ссылка</div>
          <InputCopy value={getLink(link)}/>
          <div className={styles.buttons}>
              <Button green size="9px 16px" onClick={handleCreate}>Пересоздать</Button>
              <Button red size="9px 16px" onClick={handleDelete}>Удалить</Button>
          </div>
          </>}
      {!link && <div className={styles.stub}>
          <div className={styles.text}>Нажмите создать для создания публичной ссылки</div>
          <div className={styles.buttons}>
              <Button green size="9px 16px" onClick={handleCreate}>Создать</Button>
          </div>
      </div>}

    </Modal>
  )
}
