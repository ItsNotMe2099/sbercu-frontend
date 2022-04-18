import { IUser } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')


export const createMediaLinkTemp = (data: any) => action(ActionTypes.CREATE_MEDIA_LINK_TEMP, {
  api: {
    url: `/api/media-link/temp`,
    method: 'POST',
    data
  }
})
export const createMediaLinkPublic = (data: any) => action(ActionTypes.CREATE_MEDIA_LINK_PUBLIC, {
  api: {
    url: `/api/media-link/public`,
    method: 'POST',
    data
  }
})
export const createMediaLinkVirtSchool = (data: any) => action(ActionTypes.CREATE_MEDIA_LINK_VIRTSCHOOL, {
  api: {
    url: `/api/media-link/virtschool`,
    method: 'POST',
    data
  }
})

export const createMediaLinkTempDocViewer = (data: any) => action(ActionTypes.CREATE_MEDIA_LINK_TEMP_DOC_VIEWER, {
  api: {
    url: `/api/media-link/public-temp-doc-viewer`,
    method: 'POST',
    data
  }
})
export const createPublicMediaLinkTempDocViewer = (data: any, hash) => action(ActionTypes.CREATE_MEDIA_LINK_TEMP_DOC_VIEWER, {
  api: {
    url: `/api/media-link/public/public-temp-doc-viewer?hash=${hash}`,
    method: 'POST',
    data
  }
})

export const resetMediaLinkForm = () => action(ActionTypes.RESET_MEDIA_LINK_FORM)
