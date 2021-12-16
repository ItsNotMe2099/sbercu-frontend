import {put, select, take, takeLatest} from 'redux-saga/effects'
import ActionTypes from 'components/jobs/const'
import {ActionType} from 'typesafe-actions'
import {deleteCatalog, deleteCatalogRequest, fetchCatalogList, resetCatalogList} from 'components/catalog/actions'
import ApiActionTypes from 'constants/api'
import {modalClose} from 'components/Modal/actions'
import {IRootState} from 'types'
import Router from 'next/router'
import {cancelJob, cancelJobRequest, deleteJob, deleteJobRequest} from 'components/jobs/actions'

function* jobSaga() {
  yield takeLatest(ActionTypes.DELETE_JOB,
    function* (action: ActionType<typeof deleteJob>) {
      yield put(deleteJobRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_JOB_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_JOB_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_JOB_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.CANCEL_JOB,
    function* (action: ActionType<typeof cancelJob>) {
      yield put(cancelJobRequest(action.payload.id));
      const result = yield take([ActionTypes.CANCEL_JOB_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CANCEL_JOB_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CANCEL_JOB_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose());
      }
    })
}

export default jobSaga
