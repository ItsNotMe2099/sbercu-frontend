import ApiActionTypes from "constants/api";
import {IJob, IUser} from "types";
import ActionTypes from "./const";

export interface MediaLinkState {
  currentMediaLink?: IJob[],
 formLoading: boolean,
  formError?: string | string[]
}

const initialState: MediaLinkState = {
  formLoading: false,

}

export default function MediaLinkReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_MEDIA_LINK:
      state.formLoading = true
      break;
    case ActionTypes.CREATE_MEDIA_LINK + ApiActionTypes.SUCCESS:
      state.currentMediaLink = action.payload;
      state.formLoading = false
      break;
    case ActionTypes.CREATE_MEDIA_LINK + ApiActionTypes.FAIL:
      state.formLoading = false
      state.formError = action.payload?.message || 'Unknown error'
      break;

    case ActionTypes.RESET_MEDIA_LINK_FORM:
      state.formLoading = false
      state.formError = null;
      state.currentMediaLink = null;
      break;
  }

  return state
}
