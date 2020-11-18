import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchTag = () => action(ActionTypes.FETCH_TAG, {
  api: {
    url: `https://dev.sbercu.firelabs.ru/tag-category`,
    method: 'GET',
  }
})