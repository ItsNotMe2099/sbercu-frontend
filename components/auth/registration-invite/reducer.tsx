import ActionTypes from "./const";


export interface State {
  firstStepIsComplete: boolean
  formError: string,
  formLoading: boolean
  currentUser: any,
  currentUserError?: any,
}

const initialState: State = {
  firstStepIsComplete: false,
  formLoading: false,
  formError: '',
  currentUser: {}
}

export default function registrationReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.REG_SUBMIT:
      state.formLoading = true;
      break
    case ActionTypes.REG_SUCCESS:
      break

    case ActionTypes.REG_ERROR:
      state.formError = action.payload
      state.formLoading = false;
      break

    case ActionTypes.REG_FIRST_STEP:
      state.firstStepIsComplete = true
      break

    case ActionTypes.REG_FIRST_STEP_BACK:
      state.firstStepIsComplete = false
      break
    case ActionTypes.GET_USER_BY_INVITE_SUCCESS:
      state.currentUser = action.payload
      break
    case ActionTypes.GET_USER_BY_INVITE_ERROR:
      state.currentUserError = action.payload
      break
  }

  return state
}
