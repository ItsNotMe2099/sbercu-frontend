
import { ICatalogEntry } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const setCurrentCatalogId = (id: number) => action(ActionTypes.SET_CURRENT_CATALOG_ID, {id})
export const resetCatalogForm = () => action(ActionTypes.RESET_CATALOG_FORM)
export const createCatalog = ( data: any) => action(ActionTypes.CREATE_CATALOG, {data})
export const createCatalogRequest = (data: any) => action(ActionTypes.CREATE_CATALOG_REQUEST, {
  api: {
    url: `/api/catalog`,
    method: 'POST',
    data: {...data},
  }
})

export const updateCatalog = ( id: number, data: ICatalogEntry) => action(ActionTypes.UPDATE_CATALOG, {id, data})
export const updateCatalogRequest = (id: number, data: ICatalogEntry) => action(ActionTypes.UPDATE_CATALOG_REQUEST, {
  api: {
    url: `/api/catalog/${id}`,
    method: 'PATCH',
    data: data,
  }
})

export const fetchMyUploadedFiles = (data: any = {}) => action(ActionTypes.FETCH_MY_UPLOADED_FILES, {
  api: {
    url: `/api/catalog?${queryString.stringify({s: JSON.stringify({entryType: 'file'})})}`,
    method: 'GET',
  }
})
export const fetchCatalogProjects = (data: any = {}) => action(ActionTypes.FETCH_CATALOG_PROJECT_LIST, {
  api: {
    url: `/api/catalog/projects?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchCatalogList = (id, data: any = {}) => action(ActionTypes.FETCH_CATALOG_LIST, {
  api: {
    url: `/api/catalog/list/${id}?${queryString.stringify({ page: data.page || 1, per_page: data.limit || 10})}`,
    method: 'GET',
  }
})
export const fetchCatalogItem = (id) => action(ActionTypes.FETCH_CATALOG_ITEM, {
  api: {
    url: `/api/catalog/show/${id}`,
    method: 'GET',
  }
})

export const deleteCatalog = (id: number) => action(ActionTypes.DELETE_CATALOG, {id})
export const deleteCatalogRequest = (id: number) => action(ActionTypes.DELETE_CATALOG_REQUEST, {
  api: {
    url: `/api/catalog/${id}`,
    method: 'DELETE'
  }
})


export const createFiles = (files: ICatalogEntry[]) => action(ActionTypes.CREATE_FILES, {files})
export const createFile = ( data: ICatalogEntry) => action(ActionTypes.CREATE_FILE, {data})
export const createFileRequest = (data: any) => action(ActionTypes.CREATE_FILE_REQUEST, {
  api: {
    url: `/api/catalog`,
    method: 'POST',
    data: {...data},
  }
})

export const updateFile = ( id: number, data: ICatalogEntry) => action(ActionTypes.UPDATE_FILE, {id, data})
export const updateFileRequest = (id: number, data: ICatalogEntry) => action(ActionTypes.UPDATE_FILE_REQUEST, {
  api: {
    url: `/api/catalog/${id}`,
    method: 'PATCH',
    data: data,
  }
})


export const resetCatalogItem = () => action(ActionTypes.RESET_CATALOG_ITEM)
