import { takeEvery, call, put } from 'redux-saga/effects';
import {ERROR, LOADING, LOADING_COMPLETE, SUBMIT, SUCCESS} from 'const'

export function* watchOnSubmit() {
    yield takeEvery(
        SUBMIT,
        onSubmit
      );
}

function* onSubmit(action) {
    yield put({type: LOADING})
    const result = yield call(submitToServer, action.payload)
    console.log(result)
    if(result.message === "Логин и пароль неверные") {
        yield put({type: LOADING_COMPLETE})
        yield put({type: ERROR, result})
      }
      else {
        yield put({type: LOADING_COMPLETE})
        yield put({type: SUCCESS, result})
      }
  }

  async function submitToServer(data) {
    try {
      let response = await fetch('https://dev.sbercu.firelabs.ru/api/auth/login', {
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
