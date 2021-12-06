import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface FeedbackState {
  list: ICatalogEntry[],
  total?: number,
  listLoading?: boolean
  formLoading?: boolean
  formError?: string

}

const initialState: FeedbackState = {
  list: [],
  listLoading: false,
  formLoading: false,
  total: 0,
  formError: null
}

export default function FeedbackReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_FEEDBACK_LIST:
      state.listLoading = true;
      break;
    case ActionTypes.FETCH_FEEDBACK_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data.map(item => ({...item}))];
      state.total = action.payload.total
      state.listLoading = false;
      break;
    case ActionTypes.FETCH_FEEDBACK_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break;

    case ActionTypes.CREATE_FEEDBACK_REQUEST:
      state.formLoading = true;
      break;
    case ActionTypes.CREATE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS:
      state.list = [action.payload,...state.list];
      state.total = state.total + 1
      state.formLoading = false;
      break;
    case ActionTypes.CREATE_FEEDBACK_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload?.message || 'Unknown error'
      break;

    case ActionTypes.UPDATE_FEEDBACK_REQUEST:
      state.formLoading = true;
      break;
    case ActionTypes.UPDATE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS:
      state.list = state.list.map(i => ({...i, ...(i.id === action.payload.id ? action.payload : {})}))
      state.formLoading = false;
      break;
    case ActionTypes.UPDATE_FEEDBACK_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload?.message || 'Unknown error'
      break;

    case ActionTypes.DELETE_FEEDBACK_REQUEST:
      state.formLoading = true;
      break;
    case ActionTypes.DELETE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS:
      state.list = state.list.filter(i => i.id !== action.payload.id)
      state.formLoading = false;
      break;
    case ActionTypes.DELETE_FEEDBACK_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload?.message || 'Unknown error'
      break;
    case ActionTypes.RESET_FEEDBACK_LIST:
      state.listLoading = false;
      state.list = [];
      state.total = 0;
      break;
    case ActionTypes.RESET_FEEDBACK_FORM:
      state.formLoading = false;
      state.formError = null;
      break;
  }

  return state
}
