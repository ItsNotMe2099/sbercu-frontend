import {ICatalogEntry, IRootState} from 'types'
import React, {useEffect} from 'react'
import Player from 'components/video/Player'
import {getMediaPath, getMediaPathWithQuality} from 'utils/media'
import {createVideoViewHistory, getVideoViewHistory} from 'utils/requests'
import VideoConverting from 'components/video-page/component/VideoConverting'
import {isVideoConverting} from 'utils/video'

interface Props{
  item: ICatalogEntry
}

export default function VideoPageViewer(props: Props){
  const {item} = props;
  const isAudio = item?.media?.type === 'audio';
  const isConverting = isVideoConverting(item);
    const handleProgressChange = async (data) => {
    await createVideoViewHistory({
      mediaId: item?.media?.id,
      currentTime: data.currentTime,
      muted: data.muted,
      volume: data.volume,
      rate: data.rate,
    })
  }
  const loadVideoViewHistory = async () => {
    const viewHistoryRes = await getVideoViewHistory(item?.mediaId);
    return viewHistoryRes?.data;
  }
  const getDefaultSource = () => {

    const path = item.media?.fileName;

    const qualityItem = item.media?.videoElements?.find(el => el.quality === '1080p') || item.media?.videoElements[item.media?.videoElements?.length - 1];
    const quality = qualityItem?.quality;
    return qualityItem && quality ? `${getMediaPathWithQuality(path, quality)}&duration=${qualityItem.duration}` : getMediaPath(path)

  }
  return (isConverting ? <VideoConverting isCutting={item.media?.videoCutting} item={item}/> :
    <Player
      isAudio={isAudio}
      poster={getMediaPath(item.poster)}
      sources={item.media?.videoElements?.map((el,i) => ({
        label: el.quality,
        value: `${getMediaPathWithQuality(item.media.fileName, el.quality)}&duration=${el.duration}`
      })) || []}
      getViewHistory={loadVideoViewHistory}
      onChangeProgress={handleProgressChange}
      source={getDefaultSource()}/>);

}

