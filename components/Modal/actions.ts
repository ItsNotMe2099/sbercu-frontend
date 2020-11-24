import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const createFolderOpen = () => action(ActionTypes.CREATE_FOLDER)
export const modalClose = () => action(ActionTypes.MODAL_CLOSE)
