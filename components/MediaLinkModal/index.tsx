import { createCatalog, updateCatalog, updateFile } from "components/catalog/actions";
import FilePosterForm from "components/FilePosterModal/Form";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import FileEditForm from "components/FilePosterModal/Form";
import { ICatalogEntry, IRootState } from "types";
import CreateFolderForm from './Form'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {createMediaLink, resetMediaLinkForm} from "../media-links/actions";
import MediaLinkForm from "./Form";
import {useEffect} from "react";


interface Props {
  file?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function MediaLinkModal(props: Props){
  const dispatch = useDispatch()
  const mediaLink = useSelector((state: IRootState) => state.mediaLink.currentMediaLink)

  useEffect(() => {
    dispatch(resetMediaLinkForm());
  }, []);
  const handleSubmit = (data) => {
    dispatch(createMediaLink({catalogId: props.file.id, mediaId: props.file.mediaId, ...data}));
    console.log('success')
  }

  return (
    <Modal {...props} title={"Создать временную ссылку"}>
      {mediaLink ? <div className={styles.link}>${mediaLink.hash}</div> : <MediaLinkForm onSubmit={handleSubmit}/>}
    </Modal>
  )
}
