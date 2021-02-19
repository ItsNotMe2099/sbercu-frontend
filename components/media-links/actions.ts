import { IUser } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')


export const createMediaLink = (data: any) => action(ActionTypes.CREATE_MEDIA_LINK, {
  api: {
    url: `/api/media-link`,
    method: 'POST',
    data
  }
})
export const resetMediaLinkForm = () => action(ActionTypes.RESET_MEDIA_LINK_FORM)
