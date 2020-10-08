import { ERROR, RESET, SENDED } from 'const'

export interface State {
  formIsSuccess: boolean
  formIsError: boolean
}

const initialState: State = {
  formIsSuccess: false,
  formIsError: false
}

export default function PWRecoverEmailReducer(state = {...initialState}, action) {

  switch(action.type) {
    
    case SENDED:
      state.formIsSuccess = true
      //window.location.href = "/email-sended";
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