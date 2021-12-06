import {
  catalogAddToFavorite,
  catalogAddToFavoriteRequest, catalogRemoveFromFavorite, catalogRemoveFromFavoriteRequest,
  createSpeaker,
  createSpeakerRequest,
  deleteSpeaker,
  deleteSpeakerRequest,
  fetchSpeakerItemRequest,
  fetchSpeakerList, resetSpeakerList,
  updateSpeaker,
  updateSpeakerRequest
} from "components/speakers/actions";
import {modalClose} from "components/Modal/actions";
import ApiActionTypes from "constants/api";
import { router } from "next/client";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRequestData, IResponse, IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'

import Router from "next/router";

function* speakerSaga() {

    yield takeLatest(ActionTypes.CREATE_SPEAKER,
        function* (action: ActionType<typeof createSpeaker>) {
            yield put(createSpeakerRequest(action.payload.data));
            const result = yield take([ActionTypes.CREATE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SPEAKER_REQUEST + ApiActionTypes.FAIL])
            if (result.type === ActionTypes.CREATE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS) {
                console.log("CREATE TAG_CATEGORY SUCCESS")
                    Router.push(`/speaker/${result.payload.id}`)

                yield put(modalClose());
            }
        })
    yield takeLatest(ActionTypes.UPDATE_SPEAKER,
        function* (action: ActionType<typeof updateSpeaker>) {
            yield put(updateSpeakerRequest(action.payload.id, action.payload.data));
            const result = yield take([ActionTypes.UPDATE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SPEAKER_REQUEST + ApiActionTypes.FAIL])
            if (result.type === ActionTypes.UPDATE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS) {
                console.log("UPDATE TAG_CATEGORY SUCCESS")
                    Router.push(`/speaker/${result.payload.id}`)

            }
        })
    yield takeLatest(ActionTypes.DELETE_SPEAKER,
        function* (action: ActionType<typeof deleteSpeaker>) {
            yield put(deleteSpeakerRequest(action.payload.id));
            const result = yield take([ActionTypes.DELETE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SPEAKER_REQUEST + ApiActionTypes.FAIL])
            if (result.type === ActionTypes.DELETE_SPEAKER_REQUEST + ApiActionTypes.SUCCESS) {
                console.log("DELETE TAG_CATEGORY SUCCESS")
                yield put(modalClose());
              Router.replace(`/speakers`);
            }
        })

    

  yield takeLatest(ActionTypes.SPEAKER_ADD_TO_FAVORITE,
    function* (action: ActionType<typeof catalogAddToFavorite>) {
      yield put(catalogAddToFavoriteRequest(action.payload.id));
    })
  yield takeLatest(ActionTypes.SPEAKER_DELETE_FROM_FAVORITE,
    function* (action: ActionType<typeof catalogRemoveFromFavorite>) {
      yield put(catalogRemoveFromFavoriteRequest(action.payload.id));
    })
}

export default speakerSaga
