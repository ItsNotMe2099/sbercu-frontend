import ActionTypes from './const';
import { takeLatest, call, put } from 'redux-saga/effects';
import cookie from "js-cookie";

export function* watchOnRegistration() {
    yield takeLatest(
        ActionTypes.REG_SUBMIT,
        onSubmit
    );
    yield takeLatest(
        ActionTypes.GET_USER_BY_INVITE,
        onGetUserByInvite
    );
}
function* onGetUserByInvite(action) {
            console.log("get user",action.payload)
        let response =  yield call(fetch, `${process.env.NEXT_PUBLIC_API_URL || 'https://dev.sbercu.firelabs.ru'}/api/auth/user/${action.payload.token}`, {
            method: 'GET',
        })
        console.log("response", response);
        if(response.status >= 200 && response.status <= 299){
            let responseJson = yield response.json()
            yield put({type: ActionTypes.GET_USER_BY_INVITE_SUCCESS, payload: responseJson})
        }else{
            let responseJson = yield response.json()
            yield put({type: ActionTypes.GET_USER_BY_INVITE_ERROR, payload: responseJson.errors})

        }

}
function* onSubmit(action) {

    try {
        const result = yield call(submitToServer, action.payload)
        console.log("Result", result)
        yield put({type: ActionTypes.REG_SUCCESS, payload: result})
        cookie.set("token", result.accessToken, { expires: 1 });
        window.location.href = "/";
    }catch (e) {
        console.log("Error", e.message)
        yield put({type: ActionTypes.REG_ERROR, payload: e.message})
    }
  }

  async function submitToServer(data) {

      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://dev.sbercu.firelabs.ru'}/api/auth/register`, {
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
