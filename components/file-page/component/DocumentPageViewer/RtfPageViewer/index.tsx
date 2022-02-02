import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Tiff from 'browser-tiff.js';
import {EMFJS, RTFJS, WMFJS} from 'rtf.js';
import DocumentToolbar from 'components/file-page/component/DocumentPageViewer/DocumentToolbar'
import {getMediaPath} from 'utils/media'
import DocumentLoader from 'components/file-page/component/DocumentPageViewer/DocumentLoader'
interface Props{
  item: ICatalogEntry
}

export default function RtfPageViewer(props: Props){
  const {item} = props;
  const [isLoading, setIsLoading] = useState(true);
  const textRef = useRef(null);

  useEffect(() => {
    console.log("useEffect");

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer'
    xhr.open('GET', '/test.rtf')//getMediaPath(item.media.fileName));
    setIsLoading(true);
    xhr.onload = function(e) {

      const arrayBuffer = this.response;
      console.log("onLoad", arrayBuffer);
      const doc = new RTFJS.Document(arrayBuffer, {

      });


      doc.render().then(html => {
        console.log("html", html);
        for(let item of html) {
          textRef.current.append(item);
        }
      }).catch(e => {
        if (e instanceof RTFJS.Error) {
        console.error("Error");
          throw e;
        }
        else {
          throw e;
        }
      });
      setIsLoading(false)
    }
    xhr.send();
  }, [])

  return (
          <div className={styles.root} >
            {isLoading && <DocumentLoader/>}
             <div ref={textRef} className={styles.text}>

            </div>
          </div>
  )
}

