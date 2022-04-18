import { createCatalog, updateCatalog, updateFile } from "components/catalog/actions";
import TextArea from "components/ui/Inputs/TextArea";
import Modal from 'components/ui/Modal'
import { ICatalogEntry, IRootState } from "types";

import { useDispatch, useSelector } from 'react-redux'


interface Props {
  video?: ICatalogEntry,
  isOpen: boolean,
  onRequestClose:() => void
}

export default function VideoCodeModal({video, ...props}: Props){
  const dispatch = useDispatch()

    const getMediaLink = () => {

      const filePath = video.media.videoElements.find(i => i.quality === '1080p')?.filePath || video.media.filePath;
      const host = window.location.protocol + "//" + window.location.host;
      if(filePath.indexOf('/uploads') === 0){
        return `${host}/media-link/virt-school/${filePath.split('/uploads/')[1]}`;
      }else if(filePath.includes('https://')){
        return `${host}/virtschool/${filePath.replace('https://videocod.sberbank-school.ru/static/mh_default_org/engage-player/', '')}`;
      }
      //Получить качество
    }
  return (
    <Modal {...props} title="Код для вставки">
        <TextArea meta={{}} input={{
            value: `${getMediaLink()}`,

        }} label={''} type={''}/>

    </Modal>
  )
}
