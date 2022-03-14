import styles from './index.module.scss'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from "components/file-page/component/DocumentPageViewer/PdfPageViewer/pdf-worker";
import DocumentToolbar from 'components/file-page/component/DocumentPageViewer/DocumentToolbar'
import DocumentLoader from 'components/file-page/component/DocumentPageViewer/DocumentLoader'
import {getMediaPath} from 'utils/media'
import {
  createMediaLinkTempDocViewer,
  createPublicMediaLinkTempDocViewer,
  resetMediaLinkForm
} from 'components/media-links/actions'
import {FullScreen, useFullScreenHandle} from 'react-full-screen'
import Cross from 'components/svg/Cross'

pdfjs.GlobalWorkerOptions.workerSrc = '/vendor-js/pdf.worker.js';

interface Props{
  item: ICatalogEntry
  publicHash?: string
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
  const handle = useFullScreenHandle();
  useEffect(() => {
    const setDivSize = () => {

      setWidth(wrapperRef.current.getBoundingClientRect().width);

    };
    if(props.publicHash){
      dispatch(createPublicMediaLinkTempDocViewer({catalogId: item.id}, props.publicHash))
    }else{
      dispatch(createMediaLinkTempDocViewer({catalogId: item.id}))
    }
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
  const handleKeyDown = (e) => {
    if (e.keyCode === 37 && page > 1) {
      setPage(page -1);
    } else if (e.keyCode === 39 && page < totalPages - 1) {
      setPage(page + 1);
    }
  }

  return (
          <div className={styles.root} ref={(ref) => {
              if(ref) {
                setWidth(ref.getBoundingClientRect().width);

                wrapperRef.current = ref;
              }
          }}>
            <div className={styles.document} style={{opacity: isLoading ? 0 : 1}}>
              {(link || props.publicHash) && !handle.active && <Document debug file={{
                url: getMediaPath(item.media.fileName, props.publicHash),
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
                <DocumentToolbar onFullScreen={handle.enter} page={page} totalPages={totalPages} onChangePage={handleChangePage}/>

            </div>}
            <FullScreen handle={handle} >

              {handle.active && <div className={styles.fullscreen}>
                {(link || props.publicHash) && <Document debug file={{
                  url: getMediaPath(item.media.fileName, props.publicHash),
                  withCredentials: true,
                }}
                                   loading={<DocumentLoader/>}
                  //getMediaPath(item.media.fileName)}
                                   onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={page}
                          width={window.screen.width }/>
                </Document>}
                {!isLoading && <div className={styles.paginationFullScreen}>
                    <DocumentToolbar page={page}  isFullScreen onFullScreen={handle.exit} totalPages={totalPages} onChangePage={handleChangePage}/>
                </div>}
              </div>}
              </FullScreen>
          </div>
  )
}

