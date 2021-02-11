import { IUser } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const resetUserForm = () => action(ActionTypes.RESET_USER_FORM)
export const createUser = ( data: any) => action(ActionTypes.CREATE_USER, {data})
export const createUserRequest = (data: any) => action(ActionTypes.CREATE_USER_REQUEST, {
  api: {
    url: `/api/auth/invite`,
    method: 'POST',
    data: {...data},
  }
})

export const updateUser = ( id: number, data: IUser) => action(ActionTypes.UPDATE_USER, {id, data})
export const updateUserRequest = (id: number, data: IUser) => action(ActionTypes.UPDATE_USER_REQUEST, {
  api: {
    url: `/api/user/${id}`,
    method: 'PUT',
    data: data,
  }
})


export const fetchUserList = ( data: any = {}) => action(ActionTypes.FETCH_USER_LIST, {
  api: {
    url: `/api/user?${queryString.stringify({...data, page: data.page || 1, limit: data.limit || 10})}`,
    method: 'GET',
  }
})

export const fetchOneUserRequest = (id: number) => action(ActionTypes.FETCH_ONE_USER, {
  api: {
    url: `/api/user/${id}`,
    method: 'GET'
  }
})

export const deleteUser = (id: number) => action(ActionTypes.DELETE_USER, {id})
export const deleteUserRequest = (id: number) => action(ActionTypes.DELETE_USER_REQUEST, {
  api: {
    url: `/api/user/${id}`,
    method: 'DELETE'
  }
})

export const setUserListPage = ( page: number) => action(ActionTypes.SET_USER_PAGE, page)
export const resetUserList = () => action(ActionTypes.RESET_USER_LIST)
