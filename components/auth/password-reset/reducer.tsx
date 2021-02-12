import ActionTypes from "./const";

export interface State {
  formIsSuccess: boolean
  formLoading: boolean
  formError?: string
}

const initialState: State = {
  formIsSuccess: false,
  formLoading: false
}

export default function NewPasswordReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.PASSWORD_RESET_SUBMIT:
      state.formLoading = true;
      break
    case ActionTypes.PASSWORD_RESET_SUCCESS:
      state.formIsSuccess = true
      window.location.href = "/auth-page";
      break

    case ActionTypes.PASSWORD_RESET_ERROR:
      state.formError = action.payload
      state.formLoading = false;
      break

    case ActionTypes.PASSWORD_RESET_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
