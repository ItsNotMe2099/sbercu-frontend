
import { ITag, ITagCategory } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
export const resetTagCategoryForm = () => action(ActionTypes.RESET_TAG_CATEGORY_FORM)
export const createTagCategory = ( data: any) => action(ActionTypes.CREATE_TAG_CATEGORY, {data})
export const createTagCategoryRequest = (data: any) => action(ActionTypes.CREATE_TAG_CATEGORY_REQUEST, {
  api: {
    url: `/api/tag-category`,
    method: 'POST',
    data: {...data},
  }
})

export const updateTagCategory = ( id: number, data: ITagCategory) => action(ActionTypes.UPDATE_TAG_CATEGORY, {id, data})
export const updateTagCategoryRequest = (id: number, data: ITagCategory) => action(ActionTypes.UPDATE_TAG_CATEGORY_REQUEST, {
  api: {
    url: `/api/tag-category/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchTagCategoryList = () => action(ActionTypes.FETCH_TAG_CATEGORY_LIST, {
  api: {
    url: `/api/tag-category`,
    method: 'GET',
  }
})
export const fetchTagCategoryListByName = (name: string) => action(ActionTypes.FETCH_TAG_CATEGORY_LIST, {
  api: {
    url: `/api/tag-category?s=${JSON.stringify({name})}`,
    method: 'GET',
  }
})

export const deleteTagCategory = (id: number) => action(ActionTypes.DELETE_TAG_CATEGORY, {id})
export const deleteTagCategoryRequest = (id: number) => action(ActionTypes.DELETE_TAG_CATEGORY_REQUEST, {
  api: {
    url: `/api/tag-category/${id}`,
    method: 'DELETE'
  }
})
