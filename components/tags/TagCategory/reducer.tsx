import ApiActionTypes from "constants/api";
import { ITagCategory } from "types";
import ActionTypes from "./const";

export interface TagCategoryState {
  list: ITagCategory[],
  currentCategory?: ITagCategory,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
}

const initialState: TagCategoryState = {
  list: [],
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
}

export default function ProfileReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_TAG_CATEGORY_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.CREATE_TAG_CATEGORY_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_TAG_CATEGORY_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_TAG_CATEGORY_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_TAG_CATEGORY_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_TAG_CATEGORY_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_TAG_CATEGORY_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_TAG_CATEGORY_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_TAG_CATEGORY_LIST + ApiActionTypes.SUCCESS:
      state.list = action.payload
      state.listLoading = false;
      break
    case ActionTypes.FETCH_TAG_CATEGORY_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_TAG_CATEGORY:
      state.currentLoading = true;
      break
    case ActionTypes.FETCH_TAG_CATEGORY + ApiActionTypes.SUCCESS:
      state.currentCategory = action.payload
      state.currentLoading = false;
      break
    case ActionTypes.FETCH_TAG_CATEGORY + ApiActionTypes.FAIL:
      state.currentLoading = false;
      break
  }

  return state
}
