import { takeEvery, call, put } from 'redux-saga/effects';
import {ERROR, SEND, SENDED} from 'const'

export function* watchOnEmailSubmit() {
    yield takeEvery(
        SEND,
        onSubmit
      );
}

function* onSubmit(action) {
    const result = yield call(submitToServer, action.payload)
    if(result.message === "User not found") {
        yield put({type: ERROR, result})
      }
    else {
        yield put({type: SENDED, result})
      }
  }

  async function submitToServer(data) {
    try {
      let response = await fetch('https://dev.sbercu.firelabs.ru/api/auth/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      let responseJson = await response.json()
      return responseJson
    }
    catch(error) {
      console.error(error)
    }
  }
