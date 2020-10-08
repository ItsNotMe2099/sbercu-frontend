import ActionTypes from "pages/auth-page/const";
import { takeEvery, call, put } from 'redux-saga/effects';
import {ERROR, SUBMIT, SUCCESS} from 'const'

export function* watchOnLoginSubmit() {
    yield takeEvery(
        ActionTypes.LOGIN_SUBMIT,
        onSubmit
      );
}

function* onSubmit(action) {

    try {
        const result = yield call(submitToServer, action.payload)
        console.log("Result", result)
        yield put({type: ActionTypes.LOGIN_SUCCESS, payload: result})

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
