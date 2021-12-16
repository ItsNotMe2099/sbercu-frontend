import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface PasswordRecoverySubmitData{
  email: string,
}
export const passwordRecoverySubmit = (data: PasswordRecoverySubmitData) => action(ActionTypes.PASSWORD_RECOVERY_SUBMIT, data)
export const passwordRecoveryReset = () => action(ActionTypes.PASSWORD_RECOVERY_RESET)
export const passwordRecoverySuccess = () => action(ActionTypes.PASSWORD_RECOVERY_SUCCESS)
export const passwordRecoveryError = (error) => action(ActionTypes.PASSWORD_RECOVERY_ERROR, {error})
