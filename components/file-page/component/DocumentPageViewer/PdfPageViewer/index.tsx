import styles from './index.module.scss'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from "components/file-page/component/DocumentPageViewer/PdfPageViewer/pdf-worker";
import DocumentToolbar from 'components/file-page/component/DocumentPageViewer/DocumentToolbar'
import DocumentLoader from 'components/file-page/component/DocumentPageViewer/DocumentLoader'
import {getMediaPath} from 'utils/media'
import {createMediaLinkTempDocViewer, resetMediaLinkForm} from 'components/media-links/actions'

pdfjs.GlobalWorkerOptions.workerSrc = '/vendor-js/pdf.worker.js';

interface Props{
  item: ICatalogEntry
}

export default function PdfPageViewer(props: Props){
  const {item} = props;
   const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const wrapperRef = useRef(null);
  const linkLoading = useSelector((state: IRootState) => state.mediaLink.tempDocLinkLoading)
  const link = useSelector((state: IRootState) => state.mediaLink.currentTempDocLink)
  const [width, setWidth] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    const setDivSize = () => {

      setWidth(wrapperRef.current.getBoundingClientRect().width);

    };
    dispatch(createMediaLinkTempDocViewer({catalogId: item.id}))
    window.addEventListener("resize", setDivSize, false);
    return () => {
      window.removeEventListener("resize", setDivSize, false);
      dispatch(resetMediaLinkForm());
    }
  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages)
    setIsLoading(false)
  }
  const handleChangePage = (page) => {

    setPage(page);

  }
  return (
          <div className={styles.root} ref={(ref) => {
              if(ref) {
                setWidth(ref.getBoundingClientRect().width);

                wrapperRef.current = ref;
              }
          }}>
            <div className={styles.document} style={{opacity: isLoading ? 0 : 1}}>
              {link && <Document debug file={{
                url: getMediaPath(item.media.fileName),
                withCredentials: true,
              }}
                                 loading={<DocumentLoader/>}
              //getMediaPath(item.media.fileName)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={page}
                    width={width < 600 ? 600 : width }/>
            </Document>}
            </div>
            {!isLoading && <div className={styles.pagination}>
                <DocumentToolbar page={page} totalPages={totalPages} onChangePage={handleChangePage}/>
            </div>}
          </div>
  )
}

