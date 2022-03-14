import {ICatalogEntry, IMedia, IRootState} from "types";
import {getMediaPath, getMediaPathWithQuality} from "utils/media";
import Player from 'components/video/Player';
import request from 'utils/request'
import styles from './index.module.scss'

const queryString = require('query-string')

interface Props {
  video: IMedia
}


const Video = (props: Props) => {
  const {video} = props;

  const getDefaultSource = () => {

    const path = video.fileName || video.filePath;
    const quality = video?.videoElements?.find(el => el.quality === '1080p')?.filePath || video?.videoElements[video?.videoElements?.length - 1]?.filePath;

    return quality || video.filePath || getMediaPath(path);
  }
  return (<div className={styles.root} onContextMenu={e => e.preventDefault()}>
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
  return {props: {video: res.data}}
}