import ActionTypes from "./const";
import { takeLatest, call, put } from 'redux-saga/effects';
import {ERROR, SUBMIT, SUCCESS} from 'const'
import cookie from "js-cookie";
import { loginError, loginSubmit } from "./actions";
import { ActionType } from "typesafe-actions";
import { IRequestData, IResponse } from "types";
import requestGen from "utils/requestGen";

function* watchOnLoginSubmit() {

    yield takeLatest(ActionTypes.LOGIN_SUBMIT,
        function* (action: ActionType<typeof loginSubmit>) {
          const res: IResponse = yield requestGen({
            url: `/api/auth/login`,
            method: 'POST',
            data: action.payload,
          } as IRequestData)
          console.log("Res signup", res)
          if(!res.err){
            cookie.set("token", res.data.accessToken, { expires: 1 });
            window.location.href = action.payload.redirect || '/';
          }else{
            yield put(loginError(res.err?.message));
          }

        })
}

  export default watchOnLoginSubmit
