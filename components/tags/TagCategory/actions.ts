
import {ITag, ITagCategory, ITagCategoryType} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
export const resetTagCategoryForm = () => action(ActionTypes.RESET_TAG_CATEGORY_FORM)
export const setTagCategoryType = (categoryType: ITagCategoryType) => action(ActionTypes.SET_CATEGORY_TYPE, {categoryType})
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
    method: 'PATCH',
    data: data,
  }
})
export const fetchTagCategoryList = (categoryType: ITagCategoryType) => action(ActionTypes.FETCH_TAG_CATEGORY_LIST, {
  api: {
    url: `/api/tag-category?s=${JSON.stringify({categoryType})}`,
    method: 'GET',
  }
})
export const fetchTagCategoryListByName = (categoryType: ITagCategoryType,name: string) => action(ActionTypes.FETCH_TAG_CATEGORY_LIST, {
  api: {
    url: `/api/tag-category?s=${JSON.stringify({name, categoryType})}`,
    method: 'GET',
  }
})

export const resetTagCategoryList = () => action(ActionTypes.RESET_TAG_CATEGORY_LIST)
export const deleteTagCategory = (id: number) => action(ActionTypes.DELETE_TAG_CATEGORY, {id})
export const deleteTagCategoryRequest = (id: number) => action(ActionTypes.DELETE_TAG_CATEGORY_REQUEST, {
  api: {
    url: `/api/tag-category/${id}`,
    method: 'DELETE'
  }
})
