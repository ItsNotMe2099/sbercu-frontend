import ApiActionTypes from "constants/api";
import {IJob, IUser} from "types";
import ActionTypes from "./const";

export interface MediaLinkState {
  currentMediaLink?: string,
  formLoading: boolean,
  tempDocLinkLoading: boolean,
  currentTempDocLink?: string,
  formError?: string | string[]
}

const initialState: MediaLinkState = {
  formLoading: false,
  tempDocLinkLoading: false

}

export default function MediaLinkReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_MEDIA_LINK_TEMP:
      state.formLoading = true
      break;
    case ActionTypes.CREATE_MEDIA_LINK_TEMP + ApiActionTypes.SUCCESS:
      state.currentMediaLink = action.payload.link;
      state.formLoading = false
      break;
    case ActionTypes.CREATE_MEDIA_LINK_TEMP + ApiActionTypes.FAIL:
      state.formLoading = false
      state.formError = action.payload?.message || 'Unknown error'
      break;

    case ActionTypes.CREATE_MEDIA_LINK_PUBLIC :
      state.formLoading = true
      break;

    case ActionTypes.CREATE_MEDIA_LINK_PUBLIC + ApiActionTypes.SUCCESS:
      state.currentMediaLink = action.payload.link;
      state.formLoading = false
      break;
    case ActionTypes.CREATE_MEDIA_LINK_PUBLIC + ApiActionTypes.FAIL:
      state.formLoading = false
      state.formError = action.payload?.message || 'Unknown error'
      break;

    case ActionTypes.CREATE_MEDIA_LINK_VIRTSCHOOL :
      state.formLoading = true
      break;

    case ActionTypes.CREATE_MEDIA_LINK_VIRTSCHOOL + ApiActionTypes.SUCCESS:
      state.currentMediaLink = action.payload.link;
      state.formLoading = false
      break;
    case ActionTypes.CREATE_MEDIA_LINK_VIRTSCHOOL + ApiActionTypes.FAIL:
      state.formLoading = false
      state.formError = action.payload?.message || 'Unknown error'
      break;

    case ActionTypes.CREATE_MEDIA_LINK_TEMP_DOC_VIEWER :
      state.tempDocLinkLoading = true
      break;
    case ActionTypes.CREATE_MEDIA_LINK_TEMP_DOC_VIEWER + ApiActionTypes.SUCCESS:
      state.currentTempDocLink = action.payload.link;
      state.tempDocLinkLoading = false
      break;
    case ActionTypes.CREATE_MEDIA_LINK_TEMP_DOC_VIEWER + ApiActionTypes.FAIL:
      state.tempDocLinkLoading = false
      break;

    case ActionTypes.RESET_MEDIA_LINK_FORM:
      state.formLoading = false
      state.formError = null;
      state.currentMediaLink = null;
      state.currentTempDocLink = null;
      break;
  }

  return state
}
