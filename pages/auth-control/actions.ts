import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const regFirstStep = () => action(ActionTypes.REG_FIRST_STEP)
export const regFirstStepBack = () => action(ActionTypes.REG_FIRST_STEP_BACK)
