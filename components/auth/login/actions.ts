import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface LoginSubmitData{
  email: | string,
  password: string,
  redirect?: string,
}
export const loginSubmit = (data: LoginSubmitData) => action(ActionTypes.LOGIN_SUBMIT, data)
export const loginReset = () => action(ActionTypes.LOGIN_RESET)
export const loginError = (error) => action(ActionTypes.LOGIN_ERROR, {error})
