import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Tiff from 'browser-tiff.js';
import DocumentToolbar from 'components/file-page/component/DocumentPageViewer/DocumentToolbar'
interface Props{
  item: ICatalogEntry
}

export default function TxtPageViewer(props: Props){
  const {item} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(null);
  const imgRef = useRef(null);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/1.txt`)
      .then(r => r.text())
      .then(text => {
        setText(text);
        console.log('text decoded:', text);
        setIsLoading(false);
      });
  }, [])

  return (
          <div className={styles.root} >
            {isLoading && <div className={styles.loading}>Загрузкаю...</div>}
            {!isLoading && <div className={styles.text}>
              {text}
            </div>}
          </div>
  )
}

