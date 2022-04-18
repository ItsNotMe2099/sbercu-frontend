import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Tiff from 'browser-tiff.js';
import DocumentToolbar from 'components/file-page/component/DocumentPageViewer/DocumentToolbar'
import DocumentLoader from 'components/file-page/component/DocumentPageViewer/DocumentLoader'
import {getMediaPath} from 'utils/media'
interface Props{
  item: ICatalogEntry
  publicHash?: string
}

export default function TxtPageViewer(props: Props){
  const {item} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState(null);
  const imgRef = useRef(null);
  useEffect(() => {
    setIsLoading(true);
    fetch(getMediaPath(item.media?.fileName, props.publicHash))
      .then(r => r.text())
      .then(text => {
        setText(text);
        setIsLoading(false);
      });
  }, [])

  return (
          <div className={styles.root} >
            {isLoading && <DocumentLoader/>}
            {!isLoading && <div className={styles.text}>
              {text}
            </div>}
          </div>
  )
}

