import Modal from 'components/ui/Modal'
import { ICatalogEntry, IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  createMediaLinkPublic,
  createMediaLinkTemp,
  createMediaLinkVirtSchool,
  resetMediaLinkForm
} from "../media-links/actions";
import {useEffect} from "react";


interface Props {
  file?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function MediaLinkVirtSchoolModal(props: Props){
  const dispatch = useDispatch()
  const mediaLink = useSelector((state: IRootState) => state.mediaLink.currentMediaLink)

  useEffect(() => {
    dispatch(resetMediaLinkForm());
    dispatch(createMediaLinkVirtSchool({catalogId: props.file.id, quality: '1080p'}));
  }, []);
  const handleSubmit = (data) => {

  }
  return (
    <Modal {...props} title={"Ссылка ВШ ID"}>
      {mediaLink && <div className={styles.link}><a href={mediaLink} target={'blank'}>{mediaLink}</a></div>}
    </Modal>
  )
}
