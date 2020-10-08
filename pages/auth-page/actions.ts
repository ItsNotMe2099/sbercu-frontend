import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface LoginSubmitData{
  email: | string,
  password: string,
}
export const loginSubmit = (data: LoginSubmitData) => action(ActionTypes.LOGIN_SUBMIT, data)
export const loginReset = () => action(ActionTypes.LOGIN_RESET)
