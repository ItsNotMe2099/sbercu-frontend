import ContentLoader from 'react-content-loader'
import Layout from 'components/layout/Layout';
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { IRootState } from "types";

interface Props{
  searchResults?: boolean
}

export default function DashboardLoader(props: Props){

  return (
    <>
    <div className={styles.root}>
    {props.searchResults ?
      <div className={styles.searchResult}>Загрузка результатов поиска</div>
      :
      null}
    <ContentLoader
    speed={1}
    width={1250}
    height={350}
    viewBox="0 0 1250 350"
    style={{ width: '100%' }}
    backgroundColor="#E0E0E0"
    foregroundColor="#e8e8e3"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="134" height="15" />
    <rect x="0" y="70" rx="5" ry="5" width="193" height="193" />
    <rect x="217" y="70" rx="5" ry="5" width="193" height="193" />
    <rect x="434" y="70" rx="5" ry="5" width="193" height="193" />
    <rect x="651" y="70" rx="5" ry="5" width="193" height="193" />
    <rect x="868" y="70" rx="5" ry="5" width="193" height="193" />
    <rect x="30" y="279" rx="0" ry="0" width="134" height="10" />
    <rect x="65" y="299" rx="0" ry="0" width="64" height="10" />
    <rect x="247" y="279" rx="0" ry="0" width="134" height="10" />
    <rect x="282" y="299" rx="0" ry="0" width="64" height="10" />
    <rect x="464" y="279" rx="0" ry="0" width="134" height="10" />
    <rect x="499" y="299" rx="0" ry="0" width="64" height="10" />
    <rect x="681" y="279" rx="0" ry="0" width="134" height="10" />
    <rect x="716" y="299" rx="0" ry="0" width="64" height="10" />
    <rect x="898" y="279" rx="0" ry="0" width="134" height="10" />
    <rect x="933" y="299" rx="0" ry="0" width="64" height="10" />
  </ContentLoader>
  </div>
    </>
  )
}
