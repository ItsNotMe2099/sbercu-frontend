
import { ICatalogEntry } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchCatalogSearch = (query, options) => action(ActionTypes.FETCH_CATALOG_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})

export const fetchAutoCompleteCatalogSearch = (query, options) => action(ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_SEARCH_LIST, {
  api: {
    url: `/api/catalog/search?query=${query}&${queryString.stringify(options)}`,
    method: 'GET',
  }
})
