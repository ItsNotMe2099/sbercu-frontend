
import { ICatalogEntry, IVideoTrimRange } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
import request from 'utils/request'
const queryString = require('query-string')

export const setCurrentCatalogId = (id: number | string) => action(ActionTypes.SET_CURRENT_CATALOG_ID, {id})
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
export const moveCatalogRequest = (entries: number[], parentId: number) => action(ActionTypes.MOVE_CATALOG_REQUEST, {
  api: {
    url: `/api/catalog/move`,
    method: 'POST',
    data: {entries, parentId},
  }
})

export const fetchMyUploadedFiles = (userId: number, data: any = {}) => action(ActionTypes.FETCH_MY_UPLOADED_FILES, {
  api: {
    url: `/api/catalog?${queryString.stringify({s: JSON.stringify({entryType: 'file', userId}), ...data})}&sort=createdAt,DESC`,
    method: 'GET',
  }
})
export const fetchCatalogProjects = (data: any = {}) => action(ActionTypes.FETCH_CATALOG_PROJECT_LIST, {
  api: {
    url: `/api/catalog/projects?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchOnBoardingProject = (departmentId: number) => action(ActionTypes.FETCH_ON_BOARDING_PROJECT, {
  api: {
    url: `/api/catalog/projects?${queryString.stringify({tags: departmentId, page: 1, limit: 1})}`,
    method: 'GET',
  }
})

export const fetchCatalogList = (id, page?, per_page?, sortField?, sortOrder?) => action(ActionTypes.FETCH_CATALOG_LIST, {
  sortField, sortOrder,
  api: {
    url: `/api/catalog/list/${id}?page=${page || 1}&per_page=${per_page || 10}&sortField=${sortField || 'name'}&sortOrder=${sortOrder || 'ASC'}${ (!sortOrder || sortField === 'mediaType') ? '&foldersFirst=true' : ''}`,
    method: 'GET',
  }
})
export const fetchPublicCatalogList = (id, hash, page?, per_page?, sortField?, sortOrder?) => action(ActionTypes.FETCH_CATALOG_LIST, {
  sortField, sortOrder,
  api: {
    url: `/api/catalog/public/list/${id}?hash=${hash}&page=${page || 1}&per_page=${per_page || 10}&sortField=${sortField || 'name'}&sortOrder=${sortOrder || 'ASC'}${ (!sortOrder || sortField === 'mediaType') ? '&foldersFirst=true' : ''}`,
    method: 'GET',
  }
})
export const fetchCatalogFiles = (speakerId, {page, limit}) => action(ActionTypes.FETCH_CATALOG_LIST, {
  api: {
    url: `/api/catalog/files/?page=${page || 1}&per_page=${limit || 10}&sort=createdAt,ASC&speakerId=${speakerId}`,
    method: 'GET',
  }
})
export const fetchCatalogListByIds = (id, ids: number[]) => action(ActionTypes.FETCH_CATALOG_LIST_BY_IDS, {
  api: {
    url: `/api/catalog/list/${id}?onlyIds=${ids.join(',')}`,
    method: 'GET',
  }
})

export const setCatalogItem = (data: any) => action(ActionTypes.SET_CATALOG_MEDIA_ITEM, data);
export const fetchCatalogItemRequest = (id, data = {}, shallow = false) => action(ActionTypes.FETCH_CATALOG_ITEM_REQUEST, {
  shallow,
  api: {
    url: `/api/catalog/show/${id}?${queryString.stringify(data)}`,
    method: 'GET',
  }
})
export const fetchPublicCatalogItemRequest = (id, data = {}, shallow = false) => action(ActionTypes.FETCH_CATALOG_ITEM_REQUEST, {
  shallow,
  api: {
    url: `/api/catalog/public/show/${id}?${queryString.stringify(data)}`,
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
export const deleteManyCatalog = (entries: number[]) => action(ActionTypes.DELETE_MANY_CATALOG, {entries})
export const deleteManyCatalogRequest = (entries: number[]) => action(ActionTypes.DELETE_MANY_CATALOG_REQUEST, {
  api: {
    url: `/api/catalog/delete`,
    method: 'POST',
    data: {entries}
  }
})


export const createFiles = (files: ICatalogEntry[]) => action(ActionTypes.CREATE_FILES, {files})
export const createFile = ( data: ICatalogEntry) => action(ActionTypes.CREATE_FILE, {data})
export const updateCatalogFileRequest = ( id: number, data: ICatalogEntry) => action(ActionTypes.UPDATE_CATALOG_FILE_REQUEST, {
  api: {
    url: `/api/catalog/${id}`,
    method: 'PATCH',
    data: { ...data }
  }
});
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
export const catalogAddToFavorite = ( id: number) => action(ActionTypes.CATALOG_ADD_TO_FAVORITE, {id})
export const catalogRemoveFromFavorite = ( id: number, entryType: string) => action(ActionTypes.CATALOG_DELETE_FROM_FAVORITE, {id, entryType})

export const catalogAddToFavoriteRequest = (catalogEntryId: number) => action(ActionTypes.CATALOG_ADD_TO_FAVORITE_REQUEST, {
  api: {
    url: `/api/user/favorites`,
    method: 'POST',
    data: { catalogEntryId },
  }
})


export const catalogRemoveFromFavoriteRequest = (catalogEntryId: number) => action(ActionTypes.CATALOG_DELETE_FROM_FAVORITE_REQUEST, {
  api: {
    url: `/api/user/favorites/${catalogEntryId}`,
    method: 'DELETE',
    data: { catalogEntryId },
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

export const updateCatalogItemState = (id: number, data: any) => action(ActionTypes.UPDATE_CATALOG_ITEM_STATE, { id, data
})



export const resetCatalogItem = () => action(ActionTypes.RESET_CATALOG_ITEM)

export const setCatalogPage = (page: number) => action(ActionTypes.SET_CATALOG_PAGE, {page})

export const resetCatalogList = (shallow: boolean = false, myFiles = true) => action(ActionTypes.RESET_CATALOG_LIST, {shallow, myFiles})

export const resetMyUploadedFiles = (shallow: boolean = false, myFiles = true) => action(ActionTypes.RESET_MY_UPLOADED_FILES)
export const catalogCopy = (item: ICatalogEntry[] | ICatalogEntry) => action(ActionTypes.CATALOG_COPY, item)
export const catalogPaste = (toCatalogId: number, name?: string, sourceId?: number) => action(ActionTypes.CATALOG_PASTE, {toCatalogId, name, sourceId})
export const resetFilesFromDropzone = () => action(ActionTypes.RESET_FILES_FROM_DROPZONE)
export const setFilesFromDropZone = (files: File[]) => action(ActionTypes.SET_FILES_FROM_DROPZONE, {files});
