
import { ICatalogEntry, IVideoTrimRange } from "types";
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

export const fetchMyUploadedFiles = (userId: number, data: any = {}) => action(ActionTypes.FETCH_MY_UPLOADED_FILES, {
  api: {
    url: `/api/catalog?${queryString.stringify({s: JSON.stringify({entryType: 'file', userId}), ...data})}`,
    method: 'GET',
  }
})
export const fetchCatalogProjects = (data: any = {}) => action(ActionTypes.FETCH_CATALOG_PROJECT_LIST, {
  api: {
    url: `/api/catalog/projects?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchCatalogList = (id, page?, per_page?) => action(ActionTypes.FETCH_CATALOG_LIST, {
  api: {
    url: `/api/catalog/list/${id}?page=${page || 1}&per_page=${per_page || 10}`,
    method: 'GET',
  }
})
export const fetchCatalogItem = (id, data = {}) => action(ActionTypes.FETCH_CATALOG_ITEM, {
  api: {
    url: `/api/catalog/show/${id}?${queryString.stringify(data)}`,
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

export const cutVideo = ( id: number, intervals: IVideoTrimRange[]) => action(ActionTypes.CUT_VIDEO, {id, intervals})
export const cutVideoRequest = (id: number, intervals: any[]) => action(ActionTypes.CUT_VIDEO_REQUEST, {
  api: {
    url: `/api/media/cut`,
    method: 'POST',
    data: {mediaId: id, intervals},
  }
})


export const resetCatalogItem = () => action(ActionTypes.RESET_CATALOG_ITEM)

export const setCatalogPage = (page: number) => action(ActionTypes.SET_CATALOG_PAGE, {page})

export const resetCatalogList = (shallow: boolean = false) => action(ActionTypes.RESET_CATALOG_LIST, {shallow})
export const catalogCopy = (item: ICatalogEntry) => action(ActionTypes.CATALOG_COPY, item)
export const catalogPaste = (toCatalogId: number) => action(ActionTypes.CATALOG_PASTE, {toCatalogId})
