import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface RegistrationData{
    email?: string,
    name?: string,
    surname?: string,
    password: string,
    inviteToken: string,
    role?: any,
    id?:any
}

export const regFirstStep = (data: RegistrationData) => action(ActionTypes.REG_FIRST_STEP, data)
export const regSubmit= (data: RegistrationData) => action(ActionTypes.REG_SUBMIT, data)
export const regFirstStepBack = () => action(ActionTypes.REG_FIRST_STEP_BACK)

interface UserByInviteData{
    token: string
}
export const getUserByInvite = (data: UserByInviteData) => action(ActionTypes.GET_USER_BY_INVITE, data)
