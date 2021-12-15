import { ISpeaker, IVideoTrimRange } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
import request from 'utils/request'
const queryString = require('query-string')

export const setCurrentSpeakerId = (id: number) => action(ActionTypes.SET_CURRENT_SPEAKER_ID, {id})
export const resetSpeakerForm = () => action(ActionTypes.RESET_SPEAKER_FORM)
export const createSpeaker = ( data: any) => action(ActionTypes.CREATE_SPEAKER, {data})
export const createSpeakerRequest = (data: any) => action(ActionTypes.CREATE_SPEAKER_REQUEST, {
  api: {
    url: `/api/speaker`,
    method: 'POST',
    data: {...data},
  }
})

export const updateSpeaker = ( id: number, data: ISpeaker) => action(ActionTypes.UPDATE_SPEAKER, {id, data})
export const updateSpeakerRequest = (id: number, data: ISpeaker) => action(ActionTypes.UPDATE_SPEAKER_REQUEST, {
  api: {
    url: `/api/speaker/${id}`,
    method: 'PATCH',
    data: data,
  }
})


export const fetchSpeakerList = (data: any = {}) => action(ActionTypes.FETCH_SPEAKER_LIST, {
  api: {
    url: `/api/speaker?${queryString.stringify({...data, sort: 'rating,DESC'})}`,
    method: 'GET',
  }
})

export const setSpeakerItem = (data: any) => action(ActionTypes.SET_SPEAKER_ITEM, data);
export const fetchSpeakerItemRequest = (id, data = {}) => action(ActionTypes.FETCH_SPEAKER_ITEM_REQUEST, {

  api: {
    url: `/api/speaker/${id}?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const deleteSpeaker = (id: number) => action(ActionTypes.DELETE_SPEAKER, {id})
export const deleteSpeakerRequest = (id: number) => action(ActionTypes.DELETE_SPEAKER_REQUEST, {
  api: {
    url: `/api/speaker/${id}`,
    method: 'DELETE'
  }
})


export const catalogAddToFavorite = ( id: number) => action(ActionTypes.SPEAKER_ADD_TO_FAVORITE, {id})
export const catalogRemoveFromFavorite = ( id: number, entryType: string) => action(ActionTypes.SPEAKER_DELETE_FROM_FAVORITE, {id, entryType})

export const catalogAddToFavoriteRequest = (catalogEntryId: number) => action(ActionTypes.SPEAKER_ADD_TO_FAVORITE_REQUEST, {
  api: {
    url: `/api/user/favorites`,
    method: 'POST',
    data: { catalogEntryId },
  }
})


export const catalogRemoveFromFavoriteRequest = (catalogEntryId: number) => action(ActionTypes.SPEAKER_DELETE_FROM_FAVORITE_REQUEST, {
  api: {
    url: `/api/user/favorites/${catalogEntryId}`,
    method: 'DELETE',
    data: { catalogEntryId },
  }
})


export const resetSpeakerItem = () => action(ActionTypes.RESET_SPEAKER_ITEM)
export const setSpeakerPage = (page: number) => action(ActionTypes.SET_SPEAKER_PAGE, {page})
export const resetSpeakerList = (shallow: boolean = false, myFiles = true) => action(ActionTypes.RESET_SPEAKER_LIST, {shallow, myFiles})


