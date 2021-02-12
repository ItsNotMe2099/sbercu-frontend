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

export default function VideoCodeModal(props: Props){
  const dispatch = useDispatch()

  return (
    <Modal {...props} title="Код для вставки">
      <TextArea meta={{}} input={{
        value: `${props.video.media.fileName}`,

      }} label={''} type={''}/>
    </Modal>
  )
}
