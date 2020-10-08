import { ERROR, RESET, SENDED } from 'const'
import ActionTypes from "pages/password-recovery-email/const";

export interface State {
  formIsSuccess: boolean,
  email?: string,
  formError?: string
}

const initialState: State = {
  formIsSuccess: false,
}

export default function PWRecoverEmailReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.PASSWORD_RECOVERY_SUBMIT:
      state.email = action.payload.email
      break
    case ActionTypes.PASSWORD_RECOVERY_SUCCESS:
      state.formIsSuccess = true
      //window.location.href = "/email-sended";
      break

    case ActionTypes.PASSWORD_RECOVERY_ERROR:
      console.log("FORM ERROR",  action.payload)
      state.formError = action.payload
      break

    case ActionTypes.PASSWORD_RECOVERY_RESET:
      state.formIsSuccess = false
      state.email = ''
      state.formError = ''
      break
  }

  return state
}
