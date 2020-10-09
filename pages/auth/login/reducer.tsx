import { ERROR, RESET, SUCCESS } from 'const'
import ActionTypes from "./const";

export interface State {
  formIsSuccess: boolean
  formError: string
}

const initialState: State = {
  formIsSuccess: false,
  formError: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.LOGIN_SUCCESS:
      state.formIsSuccess = true
      break

    case ActionTypes.LOGIN_ERROR:
      state.formError = action.payload
      break

    case ActionTypes.LOGIN_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
