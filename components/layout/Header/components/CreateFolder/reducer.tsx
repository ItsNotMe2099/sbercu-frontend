import ActionTypes from "./const";

export interface CreateFolderState {
  formIsSuccess: boolean,
  formError: string,
  loading: boolean,
  phone: string,
}

const initialState: CreateFolderState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
  phone: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_FOLDER_SUBMIT:
      state.formIsSuccess = false
      state.loading = true;
      break
    case ActionTypes.CREATE_FOLDER_SUCCESS:
      state.formIsSuccess = true
      state.loading = false;
      break

    case ActionTypes.CREATE_FOLDER_ERROR:
      state.formError = action.payload.error
      state.loading = false;
      console.log("get error",  action.payload)
      break

    case ActionTypes.CREATE_FOLDER_RESET:
      state.formIsSuccess = false
      state.formError = ''
      state.loading = false;
      break
  }

  return state
}
