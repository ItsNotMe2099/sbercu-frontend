import ActionTypes from "./const";
import { takeLatest, call, put } from 'redux-saga/effects';
import { ERROR, SEND, SENDED } from 'const'
import { ActionType } from "typesafe-actions";
import { passwordRecoverySubmit, passwordRecoverySuccess, passwordRecoveryError } from "./actions";
import { IRequestData, IResponse } from "types";
import requestGen from "utils/requestGen";

function* watchOnEmailSubmit() {
    yield takeLatest(ActionTypes.PASSWORD_RECOVERY_SUBMIT,
        function* (action: ActionType<typeof passwordRecoverySubmit>) {
          const res: IResponse = yield requestGen({
            url: `/api/auth/forgot`,
            method: 'POST',
            data: action.payload,
          } as IRequestData)
          console.log("Res phone", res)
          if(!res.err){
            yield put(passwordRecoverySuccess())
            yield put({type: ActionTypes.PASSWORD_RECOVERY_SUCCESS})
          }else{
            yield put(passwordRecoveryError(res.err?.message))
          }
    
        })
}

export default watchOnEmailSubmit