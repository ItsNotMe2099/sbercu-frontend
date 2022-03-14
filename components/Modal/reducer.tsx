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
    case ActionTypes.VIDEO_CODE_MODAL:
      state.modalKey = 'videoCode'
      break
    case ActionTypes.FILE_POSTER_UPLOAD_MODAL:
      state.modalKey = 'filePoster'
      break
    case ActionTypes.MEDIA_LINK_TEMP_MODAL:
      state.modalKey = 'mediaLinkTemp'
      break
    case ActionTypes.MEDIA_LINK_PUBLIC_MODAL:
      state.modalKey = 'mediaLinkPublic'
      break
    case ActionTypes.MEDIA_LINK_VIRTSCHOOL_MODAL:
      state.modalKey = 'mediaLinkVirtSchool'
      break
    case ActionTypes.PASTE_CATALOG_ITEM_DUPLICATE:
      state.modalKey = 'pasteCatalogItemDuplicate'
      break
    case ActionTypes.CREATE_SPEAKER_FEEDBACK:
      state.modalKey = 'createSpeakerFeedback'
      break
    case ActionTypes.CREATE_FOLDER_PUBLIC_LINK:
      state.modalKey = 'createFolderPublicLink'
      break


  }

  return state
}
