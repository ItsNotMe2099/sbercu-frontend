import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createMediaLinkTempDocViewer} from 'components/media-links/actions'
import {getExtension} from 'next/dist/server/serve-static'
import {getFileExtension} from 'utils/media'
import OfficePageViewer from 'components/file-page/component/DocumentPageViewer/OfficePageViewer'
import PdfPageViewer from 'components/file-page/component/DocumentPageViewer/PdfPageViewer'
import TiffPageViewer from 'components/file-page/component/DocumentPageViewer/TiffPageViewer'
import TxtPageViewer from 'components/file-page/component/DocumentPageViewer/TxtPageViewer'
import RtfPageViewer from 'components/file-page/component/DocumentPageViewer/RtfPageViewer'

interface Props{
  item: ICatalogEntry
}

export default function DocumentPageViewer(props: Props){
  const {item} = props;

  const renderDocument = () => {
    const ext = getFileExtension(item.media.filePath);
    console.log('renderDocument', ext, item.media.filePath);
    if(['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(ext)){
      return <OfficePageViewer item={item}/>
    }
    if(['pdf'].includes(ext)){
      return <PdfPageViewer item={item}/>
    }
    if(['tiff', 'tif'].includes(ext)){
      console.log("renderTiff");
      return <TiffPageViewer item={item}/>
    }
    if(['txt'].includes(ext)){
      return  <TxtPageViewer item={item}/>
    }
    if(['rtf'].includes(ext)){
      return  <RtfPageViewer item={item}/>
    }
    if(['bmp'].includes(ext)){
      return  null
    }
    return null;
  }
  return (
          <div className={styles.root}>
            {renderDocument()}
          </div>
  )
}

