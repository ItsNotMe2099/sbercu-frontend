import styles from './index.module.scss'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from "components/file-page/component/DocumentPageViewer/PdfPageViewer/pdf-worker";
import DocumentToolbar from 'components/file-page/component/DocumentPageViewer/DocumentToolbar'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface Props{
  item: ICatalogEntry
}

export default function PdfPageViewer(props: Props){
  const {item} = props;
   const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages)
    setIsLoading(false)
  }
  const handleChangePage = (page) => {
    setPage(page);

  }

  return (
          <div className={styles.root}>
            {isLoading && <div className={styles.loading}>Загрузкаю...</div>}
            <div className={styles.document} style={{opacity: isLoading ? 0 : 1}}>
            <Document
              file={`/sample.49a87e34.pdf`}
              //getMediaPath(item.media.fileName)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={page} />
            </Document>
              <div className={styles.pagination}>
                <DocumentToolbar page={page} totalPages={totalPages} onChangePage={handleChangePage}/>
              </div>
            </div>
          </div>
  )
}

