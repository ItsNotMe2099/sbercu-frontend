import Modal from 'components/ui/Modal'
import { ICatalogEntry, IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {createMediaLinkPublic, createMediaLinkTemp, resetMediaLinkForm} from "../media-links/actions";
import {useEffect} from "react";
import TextArea from "../ui/Inputs/TextArea";
import InputCopy from 'components/ui/Inputs/InputCopy'


interface Props {
  file?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function MediaLinkPublicModal(props: Props){
  const dispatch = useDispatch()
  const mediaLink = useSelector((state: IRootState) => state.mediaLink.currentMediaLink)
  const hasIframe = ['audio', 'video'].includes(props.file?.media.type);
  useEffect(() => {
    dispatch(resetMediaLinkForm());
    dispatch(createMediaLinkPublic({catalogId: props.file.id, quality: '1080p'}));
  }, []);
  const handleSubmit = (data) => {

  }

  return (
    <Modal {...props} title={"Публичная ссылка"}>
      {mediaLink && <div className={styles.link}>Публичная ссылка: <br/><InputCopy value={mediaLink}/></div>}
      {hasIframe && <div className={styles.codeLabel}>Код для вставки:</div>}
      {hasIframe && <TextArea meta={{}} input={{
        value: `<iframe class="mediateka-video" style="max-width:100%;max-height:100%;" src="${mediaLink?.replace('media-link/public', 'embed')}" width="500" height="350" allowvr="yes" frameborder="0" scrolling="no" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>`,

      }} label={''} type={''}/>}
    </Modal>
  )
}
