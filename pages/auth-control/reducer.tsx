import ActionTypes from "pages/auth-control/const";

export interface State {
  firstStepIsComplete: boolean
  formError: string,
}

const initialState: State = {
  firstStepIsComplete: false,
  formError: ''
}

export default function registrationReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.REG_SUCCESS:
      window.location.href = "/welcome";
      break

    case ActionTypes.REG_ERROR:
      state.formError = action.payload
      break

    case ActionTypes.REG_FIRST_STEP:
      state.firstStepIsComplete = true
      break

    case ActionTypes.REG_FIRST_STEP_BACK:
      state.firstStepIsComplete = false
      break
  }

  return state
}
