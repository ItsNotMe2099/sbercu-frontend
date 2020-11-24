import ActionTypes from "./const";

export interface ModalState {
  modalKey: string,
}
const initialState: ModalState = {
  modalKey: ''
}

export default function modalReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.CREATE_FOLDER:
      state.modalKey = 'createFolder'
      break

    case ActionTypes.MODAL_CLOSE:
      state.modalKey = ''
      break
  }

  return state
}
