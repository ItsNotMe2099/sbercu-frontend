import { IUser } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchOneJob = (id: number) => action(ActionTypes.FETCH_ONE_JOB, {
  api: {
    url: `/api/job/${id}`,
    method: 'GET'
  }
})


export const fetchJobList = ( data: any = {}) => action(ActionTypes.FETCH_JOB_LIST, {
  api: {
    url: `/api/job?${queryString.stringify({...data, page: data.page || 1, limit: data.limit || 10})}`,
    method: 'GET',
  }
})
export const fetchJobListByIds = ( ids: number[]) => action(ActionTypes.FETCH_JOB_LIST_BY_IDS, {
  api: {
    url: `/api/job?filter=id||$in||${ids.join(',')}`,
    method: 'GET',
  }
})

export const cancelJob = (id: number) => action(ActionTypes.CANCEL_JOB, {
  api: {
    url: `/api/job/cancel/${id}`,
    method: 'POST'
  }
})
export const deleteJob = (id: number) => action(ActionTypes.DELETE_JOB, {
  api: {
    url: `/api/job/${id}`,
    method: 'DELETE'
  }
})


export const setJobListPage = ( page: number) => action(ActionTypes.SET_JOB_PAGE, page)

export const resetJobList = () => action(ActionTypes.RESET_JOB_LIST)

