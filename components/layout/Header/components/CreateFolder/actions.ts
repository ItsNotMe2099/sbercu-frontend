import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface CreateFolderSubmitData{
  name: string,
  entryType: "folder",
  parentId: 0
}
export const createFolderSubmit = (data: CreateFolderSubmitData) => action(ActionTypes.CREATE_FOLDER_SUBMIT, data)
export const createFolderError = (error) => action(ActionTypes.CREATE_FOLDER_ERROR, {error})
export const createFolderReset = () => action(ActionTypes.CREATE_FOLDER_RESET)
