import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useRef, useState} from 'react'

import Script from 'next/script'
import DocumentLoader from 'components/file-page/component/DocumentPageViewer/DocumentLoader'
import {getMediaPath} from 'utils/media'
interface Props{
  item: ICatalogEntry
}

export default function RtfPageViewer(props: Props){
  const {item} = props;
  const [isLoading, setIsLoading] = useState(true);
  const textRef = useRef(null);
  const handleLoadScript = () => {
    console.log("useEffect");

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer'
    xhr.open('GET', getMediaPath(item.media.fileName));
    setIsLoading(true);
    xhr.onload = function(e) {

      const arrayBuffer = this.response;
      console.log("onLoad", arrayBuffer);
      const doc = new (window as any).Document(arrayBuffer, {

      });
    console.log("Doc", doc)

      doc.render().then(html => {
        console.log("html", html);
        for(let item of html) {
          textRef.current.append(item);
        }
      }).catch(e => {
        if (e instanceof (window as any).RTFJS.Error) {
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
  }
  useEffect(() => {

  }, [])

  return (
          <div className={styles.root} >
            {isLoading && <DocumentLoader/>}
             <div ref={textRef} className={styles.text}>

            </div>
            <Script
              id="rtfjs"
              src="/vendor-js/rtfjs.bundle.min.js"
              onLoad={handleLoadScript}
            />
          </div>
  )
}

