
import { ICatalogEntry } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchCatalogProjectsSearch = (query, options) => action(ActionTypes.FETCH_CATALOG_PROJECTS_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search/projects?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})

export const fetchCatalogFilesSearch = (query, options) => action(ActionTypes.FETCH_CATALOG_FILES_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search/files?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})

export const fetchCatalogFoldersSearch = (query, options) => action(ActionTypes.FETCH_CATALOG_FOLDERS_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search/folders?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})


export const fetchAutoCompleteCatalogProjectsSearch = (query, options) => action(ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_PROJECTS_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search/projects?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})
export const fetchAutoCompleteCatalogFilesSearch = (query, options) => action(ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FILES_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search/files?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})
export const fetchAutoCompleteCatalogFoldersSearch = (query, options) => action(ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FOLDERS_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search/folders?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})

export const resetAutoCompleteCatalogSearch = () => action(ActionTypes.RESET_AUTOCOMPLETE_SEARCH, {})
export const resetCatalogSearch = () => action(ActionTypes.RESET_SEARCH, {})
