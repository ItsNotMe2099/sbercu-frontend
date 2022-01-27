import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createMediaLinkTempDocViewer} from 'components/media-links/actions'

interface Props{
  item: ICatalogEntry
}

export default function DocumentPageViewer(props: Props){
  const {item} = props;
  const linkLoading = useSelector((state: IRootState) => state.mediaLink.tempDocLinkLoading)
  const link = useSelector((state: IRootState) => state.mediaLink.currentTempDocLink)

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(createMediaLinkTempDocViewer({catalogId: item.id}))
  }, [])
  return (
          <div className={styles.root}>
            {link && <iframe className={styles.iframe} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURI(link)}&wdAccPdf=0&wdEmbedFS=1`}/>}
          </div>
  )
}

