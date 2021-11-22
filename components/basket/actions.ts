
import { ICatalogEntry } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchCatalogProjectsDeleted = (options) => action(ActionTypes.FETCH_CATALOG_PROJECTS_DELETED_LIST, {
  api: {
    url: `/api/catalog/deleted?entryType=project`,
    method: 'GET',
  }
})

export const fetchCatalogFilesDeleted = (options) => action(ActionTypes.FETCH_CATALOG_FILES_DELETED_LIST, {
  api: {
    url: `/api/catalog/deleted?entryType=file`,
    method: 'GET',
  }
})

export const fetchCatalogFoldersDeleted = (options) => action(ActionTypes.FETCH_CATALOG_FOLDERS_DELETED_LIST, {
  api: {
    url: `/api/catalog/deleted?entryType=folder`,
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
  id,
  api: {
    url: `/api/catalog/${id}`,
    method: 'DELETE',
  }
})

export const cleanBasket = (id: number) => action(ActionTypes.CLEAN_BASKET_REQUEST, {
  id,
  api: {
    url: `/api/catalog/deleted/clean`,
    method: 'GET',
  }
})

export const resetCatalogDeleted = () => action(ActionTypes.RESET_DELETED, {})
