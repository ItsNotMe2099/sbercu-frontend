import { createCatalog, updateCatalog, updateFile } from "components/catalog/actions";
import FilePosterForm from "components/FilePosterModal/Form";
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import FileEditForm from "components/FilePosterModal/Form";
import { ICatalogEntry, IRootState } from "types";
import CreateFolderForm from './Form'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {createMediaLinkTemp, resetMediaLinkForm} from "../media-links/actions";
import MediaLinkForm from "./Form";
import {useEffect} from "react";
import {format, parse} from "date-fns";
import InputCopy from 'components/ui/Inputs/InputCopy'


interface Props {
  file?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function MediaLinkTempModal(props: Props){
  const dispatch = useDispatch()
  const mediaLink = useSelector((state: IRootState) => state.mediaLink.currentMediaLink)

  useEffect(() => {
    dispatch(resetMediaLinkForm());
  }, []);
  const handleSubmit = (data) => {
    console.log("data.expiredAt", data)
    dispatch(createMediaLinkTemp({catalogId: props.file.id, mediaId: props.file.mediaId, expiredAt: data.expiredAt}));
    console.log('success')
  }
  return (
    <Modal {...props} title={"Создать временную ссылку"}>
      {mediaLink ? <div className={styles.link}><InputCopy label={'Временная ссылка'} value={mediaLink}/></div> : <MediaLinkForm onSubmit={handleSubmit}/>}
    </Modal>
  )
}
