import styles from './index.module.scss'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from "components/file-page/component/DocumentPageViewer/PdfPageViewer/pdf-worker";
import DocumentToolbar from 'components/file-page/component/DocumentPageViewer/DocumentToolbar'
import DocumentLoader from 'components/file-page/component/DocumentPageViewer/DocumentLoader'
import {getMediaPath} from 'utils/media'
import {createMediaLinkTempDocViewer, resetMediaLinkForm} from 'components/media-links/actions'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

interface Props{
  item: ICatalogEntry
}

export default function PdfPageViewer(props: Props){
  const {item} = props;
   const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const linkLoading = useSelector((state: IRootState) => state.mediaLink.tempDocLinkLoading)
  const link = useSelector((state: IRootState) => state.mediaLink.currentTempDocLink)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createMediaLinkTempDocViewer({catalogId: item.id}))
    return () => {
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
  console.log("PdfLoad", getMediaPath(item.media?.fileName));
  return (
          <div className={styles.root}>
            <div className={styles.document} style={{opacity: isLoading ? 0 : 1}}>
              {link && <Document debug file={{
                url: getMediaPath(item.media.fileName),
                withCredentials: true,
              }}
                                 loading={<DocumentLoader/>}
              //getMediaPath(item.media.fileName)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={page} />
            </Document>}
            </div>
            {!isLoading && <div className={styles.pagination}>
                <DocumentToolbar page={page} totalPages={totalPages} onChangePage={handleChangePage}/>
            </div>}
          </div>
  )
}

