
import { ICatalogEntry } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchCatalogProjectsDeleted = (options) => action(ActionTypes.FETCH_CATALOG_PROJECTS_DELETED_LIST, {
  api: {
    url: `/api/catalog/deleted?${queryString.stringify({...options, entryType: 'project', sort: 'deletedAt,DESC'})}`,
    method: 'GET',
  }
})

export const fetchCatalogFilesDeleted = (options) => action(ActionTypes.FETCH_CATALOG_FILES_DELETED_LIST, {
  api: {
    url: `/api/catalog/deleted?${queryString.stringify({...options, entryType: 'file', sort: 'deletedAt,DESC'})}`,
    method: 'GET',
  }
})

export const fetchCatalogFoldersDeleted = (options) => action(ActionTypes.FETCH_CATALOG_FOLDERS_DELETED_LIST, {
  api: {
    url: `/api/catalog/deleted?${queryString.stringify({...options, entryType: 'folder', sort: 'deletedAt,DESC'})}`,
    method: 'GET',
  }
})
export const restoreCatalogItemDeleted = (id: number) => action(ActionTypes.RESTORE_CATALOG_ITEM_REQUEST, {
  id,
  api: {
    url: `/api/catalog/restore/${id}`,
    method: 'GET',
  }
})

export const deleteCatalogItemDeleted = (id: number) => action(ActionTypes.DELETE_CATALOG_ITEM_REQUEST, {
  api: {
    url: `/api/catalog/deleted/clean`,
    method: 'POST',
    data: {entries: [id]}
  }
})

export const cleanBasket = () => action(ActionTypes.CLEAN_BASKET_REQUEST, {
  api: {
    url: `/api/catalog/deleted/cleanAll`,
    method: 'GET',
  }
})

export const resetCatalogDeleted = () => action(ActionTypes.RESET_DELETED, {})
