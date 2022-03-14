import {put, select, take, takeLatest} from 'redux-saga/effects'
import ActionTypes from 'components/feedback/const'
import {ActionType} from 'typesafe-actions'
import ApiActionTypes from 'constants/api'
import {modalClose} from 'components/Modal/actions'
import {deleteSpeaker, deleteSpeakerRequest, fetchSpeakerItemRequest} from 'components/speakers/actions'
import {
  createFeedback,
  createFeedbackRequest,
  deleteFeedback, deleteFeedbackRequest,
  updateFeedback,
  updateFeedbackRequest
} from 'components/feedback/actions'

function* feedbackSaga() {
  yield takeLatest(ActionTypes.DELETE_FEEDBACK,
    function* (action: ActionType<typeof deleteFeedback>) {

      yield put(deleteFeedbackRequest(action.payload.id));
       const result = yield take([ActionTypes.DELETE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_FEEDBACK_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose());


      }
    })
  yield takeLatest(ActionTypes.CREATE_FEEDBACK,
    function* (action: ActionType<typeof createFeedback>) {

      yield put(createFeedbackRequest(action.payload));
      const result = yield take([ActionTypes.CREATE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FEEDBACK_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose());
        if(action.payload.toSpeakerId) {
          yield put(fetchSpeakerItemRequest(action.payload.toSpeakerId));
        }

      }
    })

  yield takeLatest(ActionTypes.UPDATE_FEEDBACK,
    function* (action: ActionType<typeof updateFeedback>) {
      yield put(updateFeedbackRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_FEEDBACK_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_FEEDBACK_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose());
        if(action.payload.data.toSpeakerId) {
          yield put(fetchSpeakerItemRequest(action.payload.data.toSpeakerId));
        }
      }
    })


}

export default feedbackSaga
