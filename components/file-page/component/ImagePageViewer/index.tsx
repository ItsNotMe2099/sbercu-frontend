import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createMediaLinkTempDocViewer} from 'components/media-links/actions'
import {getMediaPath} from 'utils/media'

import Lightbox from "react-awesome-lightbox";

interface Props{
  item: ICatalogEntry
  publicHash?: string
}

export default function ImagePageViewer(props: Props){
  const {item} = props;
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const dispatch = useDispatch();
  const handleMainPhotoClick = () =>{
    setShowGallery( !showGallery);
    setGalleryIndex(0)
  }

  const path = getMediaPath(item.media?.fileName, props.publicHash);
  return (
          <div className={styles.root}>
            <div className={styles.image}  onClick={handleMainPhotoClick}>
            <img
              src={path}
              alt=''/>
            </div>
            {showGallery && <Lightbox  images={[path]}
                                       startIndex={galleryIndex}
                                       onClose={() => setShowGallery(false)}/>}

          </div>
  )
}

