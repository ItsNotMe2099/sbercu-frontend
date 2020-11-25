import { takeLatest, put, select, call } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { IRequestData, IResponse, IRootState } from 'types'
import { createFolderError, createFolderSubmit } from './actions';
export function* createFolderSaga() {


  yield takeLatest(ActionTypes.CREATE_FOLDER_SUBMIT,
    function* (action: ActionType<typeof createFolderSubmit>) {
      const res: IResponse = yield requestGen({
        url: `/api/catalog`,
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      console.log("Res signup", res)
      if(res.err){
        yield put(createFolderError(res.err?.errors));
      }

    })

}
