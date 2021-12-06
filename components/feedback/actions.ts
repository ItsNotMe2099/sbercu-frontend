
import { ICatalogEntry } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchFeedbackList = (speakerId, options) => action(ActionTypes.FETCH_FEEDBACK_LIST, {
  api: {
    url: `/api/feedback?s=${JSON.stringify({toSpeakerId: speakerId})}&${queryString.stringify({...options})}`,
    method: 'GET',
  }
})

export const createFeedback = (data:any) => action(ActionTypes.CREATE_FEEDBACK, data)
export const createFeedbackRequest = (data: any) => action(ActionTypes.CREATE_FEEDBACK_REQUEST, {
  api: {
    url: `/api/feedback`,
    method: 'POST',
    data
  }
})
export const updateFeedback = (id: number, data: any) => action(ActionTypes.UPDATE_FEEDBACK, {id, data})
export const updateFeedbackRequest = (id: number, data: any) => action(ActionTypes.UPDATE_FEEDBACK_REQUEST, {
  api: {
    url: `/api/feedback/${id}`,
    method: 'PATCH',
    data
  }
})


export const deleteFeedback = (id: number) => action(ActionTypes.DELETE_FEEDBACK, {id})
export const deleteFeedbackRequest = (id: any) => action(ActionTypes.DELETE_FEEDBACK_REQUEST, {
  api: {
    url: `/api/feedback/${id}`,
    method: 'DELETE'
  }
})

export const resetFeedbackList = () => action(ActionTypes.RESET_FEEDBACK_LIST, {})
export const resetFeedbackForm = () => action(ActionTypes.RESET_FEEDBACK_FORM, {})
