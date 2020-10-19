import ActionTypes from "./const";

export interface State {
  formIsSuccess: boolean
  formError?: string
}

const initialState: State = {
  formIsSuccess: false,
}

export default function NewPasswordReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.PASSWORD_RESET_SUCCESS:
      state.formIsSuccess = true
      window.location.href = "/auth-page";
      break

    case ActionTypes.PASSWORD_RESET_ERROR:
      state.formError = action.payload
      break

    case ActionTypes.PASSWORD_RESET_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
