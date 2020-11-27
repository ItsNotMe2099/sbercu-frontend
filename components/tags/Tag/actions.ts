
import { ITag, ITagCategory } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const resetTagForm = () => action(ActionTypes.RESET_TAG_FORM)
export const createTag = ( data: any) => action(ActionTypes.CREATE_TAG, {data})
export const createTagRequest = (data: any) => action(ActionTypes.CREATE_TAG_REQUEST, {
  api: {
    url: `/api/tag`,
    method: 'POST',
    data: {...data},
  }
})

export const updateTag = ( id: number, data: ITag) => action(ActionTypes.UPDATE_TAG, {id, data})
export const updateTagRequest = (id: number, data: ITag) => action(ActionTypes.UPDATE_TAG_REQUEST, {
  api: {
    url: `/api/tag/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchTagList = () => action(ActionTypes.FETCH_TAG_LIST, {
  api: {
    url: `/api/tag`,
    method: 'GET',
  }
})

export const deleteTag = (id: number) => action(ActionTypes.DELETE_TAG, {id})
export const deleteTagRequest = (id: number) => action(ActionTypes.DELETE_TAG_REQUEST, {
  api: {
    url: `/api/tag/${id}`,
    method: 'DELETE'
  }
})
