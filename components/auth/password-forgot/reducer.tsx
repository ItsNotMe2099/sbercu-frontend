import { ERROR, RESET, SENDED } from 'const'
import ActionTypes from "./const";

export interface State {
  formIsSuccess: boolean,
  formLoading: boolean,
  email?: string,
  formError?: string
}

const initialState: State = {
  formIsSuccess: false,
  formLoading: false,
}

export default function PWRecoverEmailReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.PASSWORD_RECOVERY_SUBMIT:
      state.email = action.payload.email
      state.formLoading = true;
      break
    case ActionTypes.PASSWORD_RECOVERY_SUCCESS:
      state.formIsSuccess = true
        state.formLoading = false;
      //window.location.href = "/email-sended";
      break

    case ActionTypes.PASSWORD_RECOVERY_ERROR:
      console.log("FORM ERROR",  action.payload)
      state.formError = action.payload.error
      state.formLoading = false;
      break

    case ActionTypes.PASSWORD_RECOVERY_RESET:
      state.formIsSuccess = false
      state.email = ''
      state.formError = ''
      break
  }

  return state
}
