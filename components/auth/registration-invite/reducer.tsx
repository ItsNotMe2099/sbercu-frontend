import ActionTypes from "./const";


export interface State {
  firstStepIsComplete: boolean
  formError: string,
  currentUser: any,
}

const initialState: State = {
  firstStepIsComplete: false,
  formError: '',
  currentUser: {}
}

export default function registrationReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.REG_SUCCESS:
      //window.location.href = "/welcome";
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
    case ActionTypes.GET_USER_BY_INVITE_SUCCESS:
      //window.location.href = "/welcome";
        state.currentUser = action.payload
      break
  }

  return state
}
