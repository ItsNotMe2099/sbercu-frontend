import request from 'utils/request'
import {VideoViewHistory} from 'types'

export const createVideoViewHistory = (data: VideoViewHistory) =>
  request({
    url: `/api/video-view-history`,
    method: 'POST',
    data
  })

export const getVideoViewHistory = (mediaId: number, ctx = null) =>
  request({
    url: `/api/video-view-history/getByMediaId/${mediaId}`,
    method: 'GET',
    timeout: 2000
  }, ctx)

