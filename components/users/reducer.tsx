import ApiActionTypes from "constants/api";
import { IUser } from "types";
import ActionTypes from "./const";

export interface UserState {
  list: IUser[],
  listTotal?: number,
  currentUserItem?: IUser,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
}

const initialState: UserState = {
  list: [],
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
}

export default function UserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_USER_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.CREATE_USER_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_USER_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_USER_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_USER_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_USER_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_USER_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_USER_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_USER_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_USER_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.FETCH_USER_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_USER_LIST + ApiActionTypes.SUCCESS:
      state.list = action.payload.data
      state.listTotal = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_USER_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break
    case ActionTypes.FETCH_USER:
      state.currentLoading = true;
      break
    case ActionTypes.FETCH_USER + ApiActionTypes.SUCCESS:
      state.currentUserItem = action.payload
      state.currentLoading = false;
      break
    case ActionTypes.FETCH_USER + ApiActionTypes.FAIL:
      state.currentLoading = false;
      break
  }

  return state
}
