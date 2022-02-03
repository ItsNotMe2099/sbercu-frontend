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
}

export default function TiffPageViewer(props: Props){
  const {item} = props;
  const linkLoading = useSelector((state: IRootState) => state.mediaLink.tempDocLinkLoading)
  const link = useSelector((state: IRootState) => state.mediaLink.currentTempDocLink)
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const imgRef = useRef(null);
  useEffect(() => {
    console.log("useEffect");
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer'
    xhr.open('GET', getMediaPath(item.media?.fileName))//getMediaPath(item.media.fileName));
    setIsLoading(true);
    xhr.onload = function(e) {
      console.log("onLoad", e);
      const arrayBuffer = this.response;
      console.log("arrayBuffer", arrayBuffer)
      Tiff.initialize({
        TOTAL_MEMORY: 16777216 * 10
      })
      const tiff = new Tiff({
        buffer: arrayBuffer
      })
      const items = [];
      for (let i = 0, len = tiff.countDirectory(); i < len; ++i) {
        tiff.setDirectory(i);
        const dataURL = tiff.toCanvas().toDataURL();

        items.push(dataURL);
      }
      if(items.length > 0){
        imgRef.current.src = items[0];
      }
      setItems(items);
      console.log('tiff', tiff);
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
            {isLoading && <DocumentLoader/>}
            <img ref={imgRef} className={styles.image} style={{opacity: isLoading ? 0 : 1}}/>
            {!isLoading && <div className={styles.pagination}>
              <DocumentToolbar page={page} totalPages={items.length} onChangePage={handleChangePage}/>
            </div>}
          </div>
  )
}
