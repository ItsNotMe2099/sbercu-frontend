import ApiActionTypes from "constants/api";
import { ISpeaker } from "types";
import ActionTypes from "./const";

export interface SpeakerState {
    list: ISpeaker[],
    listTotal?: number,
    basePath?: string,
    currentSpeakerId?: number,
    currentSpeakerItem?: ISpeaker,
    formIsSuccess: boolean
    formError: string,
    listLoading: boolean,
    currentLoading: boolean
    formLoading: boolean,
    parentsLoading: boolean,
    page: number
    isSubmitting?: boolean
    filesFromDropZone: File[]
}

const initialState: SpeakerState = {
    list: [],
    formIsSuccess: false,
    formError: '',
    formLoading: false,
    listLoading: false,
    currentLoading: false,
    parentsLoading: false,
    page: 1,
    listTotal: 0,
    filesFromDropZone: []
}

export default function SpeakerReducer(state = { ...initialState }, action) {
    switch (action.type) {
        case ActionTypes.RESET_SPEAKER_ITEM:
            state.currentSpeakerItem = null;
            break;
        case ActionTypes.SET_CURRENT_SPEAKER_ID:
            state.currentSpeakerId = action.payload.id
            break
        case ActionTypes.RESET_SPEAKER_FORM:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = false;
            break

        case ActionTypes.SET_SPEAKER_PAGE:
            state.page = action.payload.page
            break

        case ActionTypes.CREATE_SPEAKER_REQUEST:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = true;
            break
        case ActionTypes.CREATE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS:
            state.formError = ''
            state.formIsSuccess = true;
            state.formLoading = false;
            break
        case ActionTypes.CREATE_SPEAKER_REQUEST + ApiActionTypes.FAIL:
            state.formError = action.payload.error ||  action.payload.message || 'Произошла ошибка'
            state.formIsSuccess = false;
            state.formLoading = false;
            break
        case ActionTypes.UPDATE_SPEAKER_REQUEST:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = true;
            break
        case ActionTypes.UPDATE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS:
            state.formError = ''
            state.formIsSuccess = true;
            state.formLoading = false;
            break
        case ActionTypes.UPDATE_SPEAKER_REQUEST + ApiActionTypes.FAIL:
            state.formError = action.payload.error ||  action.payload.message || 'Произошла ошибка'
            state.formIsSuccess = false;
            state.formLoading = false;
            break
        case ActionTypes.DELETE_SPEAKER_REQUEST:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = true;
            break
        case ActionTypes.DELETE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS:
            state.formError = ''
            state.formIsSuccess = true;
            state.formLoading = false;
            break
        case ActionTypes.DELETE_SPEAKER_REQUEST + ApiActionTypes.FAIL:
            state.formError = action.payload.error || 'Unknown error'
            state.formIsSuccess = false;
            state.formLoading = false;
            break


        case ActionTypes.FETCH_SPEAKER_LIST:
            state.listLoading = true;
            break
        case ActionTypes.FETCH_SPEAKER_LIST + ApiActionTypes.SUCCESS:
            if(state.page > 1) {
                state.list = [...state.list, ...action.payload.data]
            }else{
                state.list = action.payload.data
            }
            state.listTotal = action.payload.total
            state.listLoading = false;
            break
        case ActionTypes.FETCH_SPEAKER_LIST + ApiActionTypes.FAIL:
            state.listLoading = false;
            break
        case ActionTypes.SPEAKER_ADD_TO_FAVORITE:
            if(state.currentSpeakerItem && state.currentSpeakerItem?.id === action.payload.id){
                state.currentSpeakerItem = {...state.currentSpeakerItem, inFavorites: true}
            }
            state.list = state.list.map(i => (i.id === action.payload.id ? {...i, inFavorites: true} : i));
            break
        case ActionTypes.SPEAKER_DELETE_FROM_FAVORITE:
            if(state.currentSpeakerItem && state.currentSpeakerItem?.id === action.payload.id){
                state.currentSpeakerItem = {...state.currentSpeakerItem, inFavorites: false}
            }
            state.list = state.list.map(i => (i.id === action.payload.id ? {...i, inFavorites: false} : i));
             break

        case ActionTypes.RESET_SPEAKER_LIST:
            state.listLoading = false;
            state.page = 1

            if (!action.payload?.shallow) {
                state.list = []
                state.listTotal = 0
            }

            break
        case ActionTypes.SET_SPEAKER_ITEM:
            state.currentSpeakerItem = {
                ...action.payload
            }
            state.currentLoading = false;
            break

        case ActionTypes.FETCH_SPEAKER_ITEM_REQUEST:
            state.currentLoading = true;
            break
        case ActionTypes.FETCH_SPEAKER_ITEM_REQUEST + ApiActionTypes.SUCCESS:
            state.currentSpeakerItem = {
                ...action.payload
            }
            state.currentLoading = false;
            break
     
        case ActionTypes.FETCH_SPEAKER_ITEM_REQUEST + ApiActionTypes.FAIL:
            state.currentLoading = false;
            break


        case ActionTypes.FETCH_SPEAKER:
            state.currentLoading = true;
            break
        case ActionTypes.FETCH_SPEAKER + ApiActionTypes.SUCCESS:
            state.currentSpeakerItem = action.payload
            state.currentLoading = false;
            break
        case ActionTypes.FETCH_SPEAKER + ApiActionTypes.FAIL:
            state.currentLoading = false;
            break
    }

    return state
}
