import ActionTypes from "./const";
import { takeEvery, call, put } from 'redux-saga/effects';
import {ERROR, SUBMIT, SUCCESS} from 'const'
import cookie from "js-cookie";
export function* watchOnLoginSubmit() {
    yield takeEvery(
        ActionTypes.LOGIN_SUBMIT,
        onSubmit
      );
}

function* onSubmit(action) {

    try {
        const result = yield call(submitToServer, action.payload)
        console.log("Resultцуцуц", result)
        cookie.set("token", result.accessToken, { expires: 1 });
        yield put({type: ActionTypes.LOGIN_SUCCESS, payload: result})
        window.location.href = "/";

    }catch (e) {
        console.log("Error", e.message)
        yield put({type: ActionTypes.LOGIN_ERROR, payload: e.message})
    }
  }

  async function submitToServer(data) {

      let response = await fetch('https://dev.sbercu.firelabs.ru/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log("response", response);
      if(response.status >= 200 && response.status <= 299){
          let responseJson = await response.json()
          return responseJson
      }else{
          let responseJson = await response.json()
          throw new Error(responseJson.errors)
      }


  }
