import {ICatalogEntry, IMedia, IRootState} from "types";
import {getMediaPath, getMediaPathWithQuality} from "utils/media";
import Player from 'components/video/Player';
import request from 'utils/request'
import styles from './index.module.scss'
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const queryString = require('query-string')

interface Props {
  video: IMedia
  host: string
}


const Video = (props: Props) => {
  const {video} = props;
  const router = useRouter()
  const getDefaultSource = () => {

    const path = video.fileName || video.filePath;
    const quality = video?.videoElements?.find(el => el.quality === '1080p')?.filePath || video?.videoElements[video?.videoElements?.length - 1]?.filePath;

    return quality || video.filePath || getMediaPath(path);
  }
  return (<div className={styles.root} onContextMenu={e => e.preventDefault()}>
     {video && <NextSeo title={`Медиатека — простой и безопасный доступ к контенту`}
                             description={'Вы можете хранить и передавать коллегам файлы и папки, редактировать видео-контент. Медиатека – это облачный сервис, который позволяет не хранить файлы локально, снижая риски потерять важные файлы.'}

                              openGraph={{
        type: 'website',
        url: `https://${props.host}${router.asPath}`,
        site_name: `Медиатека — простой и безопасный доступ к контенту`,
        title:  `Медиатека — простой и безопасный доступ к контенту`,
        description: `Вы можете хранить и передавать коллегам файлы и папки, редактировать видео-контент. Медиатека – это облачный сервис, который позволяет не хранить файлы локально, снижая риски потерять важные файлы.`,

                              }}/>}
      <Player
        isAudio={video?.type === 'audio'}
        contentType={video.contentType}
        fullSize={true}
        poster={getMediaPath((video as any).poster)}
        sources={video?.videoElements?.map(el => ({label: el.quality, value: el.filePath}))}
        source={getDefaultSource()}/>
    </div>
  )
}
export default Video

export async function getServerSideProps(ctx) {
  const id = ctx.query.id;
  const res = await request({url: `/api/media-link/public-embed/${id}`, method: 'GET'})
  return {props: {video: res.data, host: ctx.req.headers['host'],}}
}