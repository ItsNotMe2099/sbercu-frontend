import { ERROR, RESET, SUCCESS } from 'const'
import ActionTypes from "./const";

export interface State {
  formIsSuccess: boolean
  formError: string
  formLoading: boolean
}

const initialState: State = {
  formIsSuccess: false,
  formError: '',
  formLoading: false,
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.LOGIN_SUBMIT:
      state.formIsSuccess = false
      state.formLoading = true

    case ActionTypes.LOGIN_SUCCESS:
      state.formIsSuccess = true
      break

    case ActionTypes.LOGIN_ERROR:
      state.formError = action.payload.error
      console.log("ERROR", state.formError)
      state.formLoading = false
      break

    case ActionTypes.LOGIN_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
