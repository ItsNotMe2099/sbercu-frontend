import ApiActionTypes from "constants/api";
import { ITag } from "types";
import ActionTypes from "./const";

export interface TagState {
  list: ITag[],
  currentCategory?: ITag,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
}

const initialState: TagState = {
  list: [],
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
}

export default function TagReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_TAG_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.CREATE_TAG_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_TAG_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_TAG_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_TAG_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_TAG_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_TAG_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_TAG_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_TAG_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_TAG_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_TAG_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_TAG_LIST + ApiActionTypes.SUCCESS:
      state.list = action.payload
      state.listLoading = false;
      break
    case ActionTypes.FETCH_TAG_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_TAG:
      state.currentLoading = true;
      break
    case ActionTypes.FETCH_TAG + ApiActionTypes.SUCCESS:
      state.currentCategory = action.payload
      state.currentLoading = false;
      break
    case ActionTypes.FETCH_TAG + ApiActionTypes.FAIL:
      state.currentLoading = false;
      break
  }

  return state
}
