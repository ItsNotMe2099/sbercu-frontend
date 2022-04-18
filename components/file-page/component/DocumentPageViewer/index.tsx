import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {getFileExtension} from 'utils/media'
import OfficePageViewer from 'components/file-page/component/DocumentPageViewer/OfficePageViewer'
import PdfPageViewer from 'components/file-page/component/DocumentPageViewer/PdfPageViewer'
import TiffPageViewer from 'components/file-page/component/DocumentPageViewer/TiffPageViewer'
import TxtPageViewer from 'components/file-page/component/DocumentPageViewer/TxtPageViewer'
import RtfPageViewer from 'components/file-page/component/DocumentPageViewer/RtfPageViewer'

interface Props{
  item: ICatalogEntry
  publicHash?: string
}

export default function DocumentPageViewer(props: Props){
  const {item} = props;

  const renderDocument = () => {
    const ext = getFileExtension(item.media.filePath);
    if(['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(ext)){
      return <OfficePageViewer item={item} publicHash={props.publicHash}/>
    }
    if(['pdf'].includes(ext)){
      return <PdfPageViewer item={item} publicHash={props.publicHash}/>
    }
    if(['tiff', 'tif'].includes(ext)){
       return <TiffPageViewer item={item} publicHash={props.publicHash}/>
    }
    if(['txt'].includes(ext)){
      return  <TxtPageViewer item={item} publicHash={props.publicHash}/>
    }
    if(['rtf'].includes(ext)){
      return  <RtfPageViewer item={item} publicHash={props.publicHash}/>
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

