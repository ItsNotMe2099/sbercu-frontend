import { getUserByInvite, regSubmit } from "components/auth/registration-invite/actions";
import { updateCatalog } from "components/catalog/actions";
import { IRequestData, IResponse } from "types";
import { ActionType } from "typesafe-actions";
import requestGen from "utils/requestGen";
import ActionTypes from './const';
import { takeLatest, call, put } from 'redux-saga/effects';
import cookie from "js-cookie";

export function* watchOnRegistration() {
    yield takeLatest(
        ActionTypes.REG_SUBMIT,
        function* (action: ActionType<typeof regSubmit>) {
            const res: IResponse = yield requestGen({
                url: `/api/auth/register`,
                method: 'POST',
                data: action.payload
            } as IRequestData)

            if(res.err){
                yield put({type: ActionTypes.REG_ERROR, payload: res.err?.message})
            }else{
                yield put({type: ActionTypes.REG_SUCCESS, payload: res.data})
                cookie.set("token", res.data.accessToken, { expires: 365 });
                window.location.href = "/";
            }
        }
    );
    yield takeLatest(
        ActionTypes.GET_USER_BY_INVITE,
        function* (action: ActionType<typeof getUserByInvite>) {
            const res: IResponse = yield requestGen({
                url: `/api/auth/user/${action.payload.token}`,
                method: 'GET',
            } as IRequestData)

            console.log("Res error", res.err);
            if(res.err){
                yield put({type: ActionTypes.GET_USER_BY_INVITE_ERROR, payload: res.err?.message})
            }else{

                yield put({type: ActionTypes.GET_USER_BY_INVITE_SUCCESS, payload: res.data})

            }
        }
    );
}
