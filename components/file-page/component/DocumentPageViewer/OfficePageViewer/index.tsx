import styles from './index.module.scss'
import {pluralize} from 'utils/formatters'
import {ICatalogEntry, IRootState} from 'types'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  createMediaLinkTempDocViewer,
  createPublicMediaLinkTempDocViewer,
  resetMediaLinkForm
} from 'components/media-links/actions'
import { Document, Page } from 'react-pdf';
import {getMediaPath} from 'utils/media'

interface Props{
  item: ICatalogEntry
  publicHash?: string
}

export default function OfficePageViewer(props: Props){
  const {item} = props;
  const linkLoading = useSelector((state: IRootState) => state.mediaLink.tempDocLinkLoading)
  const link = useSelector((state: IRootState) => state.mediaLink.currentTempDocLink)

  const dispatch = useDispatch();
  useEffect(() => {
    if(props.publicHash){
      dispatch(createPublicMediaLinkTempDocViewer({catalogId: item.id}, props.publicHash))
    }else{
      dispatch(createMediaLinkTempDocViewer({catalogId: item.id}))
    }
    return () => {
      dispatch(resetMediaLinkForm());
    }
  }, [])
  return (
    <div className={styles.root}>
      {link && <iframe className={styles.iframe} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURI(link)}&wdAccPdf=0&wdEmbedFS=1`}/>}
    </div>
  )
}

