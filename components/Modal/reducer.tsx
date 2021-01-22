import { ConfirmDataModal } from "types";
import ActionTypes from "./const";

export interface ModalState {
  modalKey: string,
  confirmData: ConfirmDataModal
}
const initialState: ModalState = {
  modalKey: '',
  confirmData: {
    onConfirm: () => {}
  }
}

export default function modalReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.TAG:
      state.modalKey = 'tag'
      break
    case ActionTypes.TAG_CATEGORY:
      state.modalKey = 'tagCategory'
      break
    case ActionTypes.CREATE_FOLDER:
      state.modalKey = 'createFolder'
      break
    case ActionTypes.EDIT_FILE:
      state.modalKey = 'editFile'
      break
    case ActionTypes.USER_MODAL:
      state.modalKey = 'userForm'
      break
    case ActionTypes.VIDEO_EDITOR_CONFIRM:
      state.modalKey = 'videoEditorConfirm'
      break;
    case ActionTypes.MODAL_CLOSE:
      state.modalKey = ''
      break
    case ActionTypes.CONFIRM_MODAL_OPEN:
      state.modalKey = 'confirm'
      state.confirmData = action.payload
      break
    case ActionTypes.CHANGE_CONFIRM_DATA:
      state.confirmData = action.payload
      break
    case ActionTypes.UPLOAD_FILES:
      state.modalKey = 'uploadFiles'
      break
  }

  return state
}
