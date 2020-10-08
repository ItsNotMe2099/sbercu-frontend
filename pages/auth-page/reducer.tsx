import { ERROR, RESET, SUCCESS } from 'const'

export interface State {
  formIsSuccess: boolean
  formIsError: boolean
}

const initialState: State = {
  formIsSuccess: false,
  formIsError: false
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {
    
    case SUCCESS:
      state.formIsSuccess = true
      window.location.href = "/welcome";
      break

    case ERROR:
      state.formIsError = true
      break
    
    case RESET:
      state.formIsSuccess = false
      state.formIsError = false
      break
  }

  return state
}