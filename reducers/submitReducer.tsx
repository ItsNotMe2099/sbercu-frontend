import { ERROR, LOADING, LOADING_COMPLETE, RESET, SUCCESS } from 'const'

export interface State {
  formIsSuccess: boolean
  formIsError: boolean
  isLoading: boolean
}

const initialState: State = {
  formIsSuccess: false,
  formIsError: false,
  isLoading: false
}

export default function submitReducer(state = {...initialState}, action) {

  switch(action.type) {
    
    case SUCCESS:
      state.formIsSuccess = true
      console.log('SUCCESS')
      break

    case ERROR:
      state.formIsError = true
      console.log('ERROR')
      break
    
    case RESET:
      state.formIsSuccess = false
      state.formIsError = false
      break
    
    case LOADING:
      state.isLoading = true
      break

    case LOADING_COMPLETE:
      state.isLoading = false
      break
  }

  return state
}