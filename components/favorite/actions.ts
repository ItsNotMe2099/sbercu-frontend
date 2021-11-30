
import { ICatalogEntry } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchCatalogProjectsFavorite = (options) => action(ActionTypes.FETCH_CATALOG_PROJECTS_FAVORITE_LIST, {
  api: {
    url: `/api/catalog/favorites?${queryString.stringify({...options, entryType: 'project'})}`,
    method: 'GET',
  }
})

export const fetchCatalogFilesFavorite = (options) => action(ActionTypes.FETCH_CATALOG_FILES_FAVORITE_LIST, {
  api: {
    url: `/api/catalog/favorites?${queryString.stringify({...options, entryType: 'file'})}`,
    method: 'GET',
  }
})

export const fetchCatalogFoldersFavorite = (options) => action(ActionTypes.FETCH_CATALOG_FOLDERS_FAVORITE_LIST, {
  api: {
    url: `/api/catalog/favorites?${queryString.stringify({...options, entryType: 'folder'})}`,
    method: 'GET',
  }
})

export const resetCatalogFavorite = () => action(ActionTypes.RESET_FAVORITE, {})
