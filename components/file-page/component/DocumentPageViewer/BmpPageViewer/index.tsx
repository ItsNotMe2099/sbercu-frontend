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

export default function BmpPageViewer(props: Props){
  const {item} = props;
  const linkLoading = useSelector((state: IRootState) => state.mediaLink.tempDocLinkLoading)
  const link = useSelector((state: IRootState) => state.mediaLink.currentTempDocLink)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const imgRef = useRef(null);

  useEffect(() => {
    console.log("useEffect");
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer'
    xhr.open('GET', '/multipage_tiff_example.tif')//getMediaPath(item.media.fileName));
    setIsLoading(true);
    xhr.onload = function(e) {
      console.log("onLoad", e);
      const arrayBuffer = this.response;

      setIsLoading(false)
    }
    xhr.send();
  }, [])
  const handleChangePage = (page) => {
    setPage(page);
    imgRef.current.src = items[page - 1];
  }
  return (
          <div className={styles.root} >
            {isLoading && <div className={styles.loading}>Загрузкаю...</div>}
            <img ref={imgRef} className={styles.image} style={{opacity: isLoading ? 0 : 1}}/>
            <div className={styles.pagination}>
              <DocumentToolbar page={page} totalPages={items.length} onChangePage={handleChangePage}/>
            </div>
          </div>
  )
}

