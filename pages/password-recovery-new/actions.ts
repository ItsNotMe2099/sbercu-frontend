import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface PasswordRecoverySubmitData{
  password: string,
  resetPasswordToken: string
}
export const passwordResetSubmit = (data: PasswordRecoverySubmitData) => action(ActionTypes.PASSWORD_RESET_SUBMIT, data)
export const passwordResetReset = () => action(ActionTypes.PASSWORD_RESET_RESET)
