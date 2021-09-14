import {ICatalogEntry, IMedia, IRootState} from "types";
import { getMediaPath, getMediaPathWithQuality } from "utils/media";
import Player from 'components/video/Player';
import request from 'utils/request'
const queryString = require('query-string')

interface Props{
  video: IMedia
}



const Video = (props: Props) => {
    const {video} = props;

    const getDefaultSource = () => {
        const path = video.fileName;
        const quality = video?.videoElements?.find(el => el.quality === '1080p')?.filePath || video.media?.videoElements[video.media?.videoElements?.length - 1]?.filePath;
        return quality  ||  getMediaPath(path);
    }
  return (
    <Player
      fullSize={true}
      poster={getMediaPath(video.poster)}
      sources={video?.videoElements?.map(el => ({label: el.quality, value: el.filePath}))}
      source={getDefaultSource()}/>
  )
}
export default Video
export async function getServerSideProps(ctx) {
  const id = ctx.query.id;
  const res = await request({url: `/api/media-link/public-embed/${id}`, method: 'GET'})
  console.log("ResData", res)
  return {props: {video: res.data}}
}