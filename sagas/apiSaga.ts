import ApiActionTypes from "constants/api";
import { action as typeAction } from 'typesafe-actions'
import { takeEvery, put } from 'redux-saga/effects'
import { BaseAction } from 'types'
import requestGen from 'utils/requestGen'

function isApi(action: BaseAction) {
  return typeof action?.payload?.api === 'object' || typeof action?.payload?.api === 'string'
}

function* apiSaga() {
  yield takeEvery<any>(isApi, function* (action: BaseAction) {
    const res = yield requestGen(action.payload.api)
    if (res.err) {
      yield put(typeAction(action.type + ApiActionTypes.FAIL, res.err))
    } else {
      yield put(typeAction(action.type + ApiActionTypes.SUCCESS, res.data))
    }
  })
}

export default apiSaga
