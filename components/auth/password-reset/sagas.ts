import {
    passwordRecoveryError,
    passwordRecoverySubmit,
    passwordRecoverySuccess
} from "components/auth/password-forgot/actions";
import { passwordResetSubmit } from "components/auth/password-reset/actions";
import { IRequestData, IResponse } from "types";
import { ActionType } from "typesafe-actions";
import requestGen from "utils/requestGen";
import ActionTypes from "./const";
import { takeEvery, call, put } from 'redux-saga/effects';
import { ERROR, SAVE, SAVED } from 'const'

export function* watchOnNewPasswordSave() {
    yield takeEvery(
        ActionTypes.PASSWORD_RESET_SUBMIT,
        function* (action: ActionType<typeof passwordResetSubmit>) {
            const res: IResponse = yield requestGen({
                url: `/api/auth/resetPass`,
                method: 'POST',
                data: action.payload,
            } as IRequestData)
            if(!res.err){
                yield put({ type: ActionTypes.PASSWORD_RESET_SUCCESS, payload: res.data })
                window.location.href = "/";
            }else{
                yield put({ type: ActionTypes.PASSWORD_RESET_ERROR, payload: res.err?.message })
            }
        }
    );
}
