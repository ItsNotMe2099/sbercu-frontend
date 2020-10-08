import { takeEvery, call, put } from 'redux-saga/effects';
import {ERROR, SAVE, SAVED} from 'const'

export function* watchOnNewPasswordSave() {
    yield takeEvery(
        SAVE,
        onSubmit
      );
}

function* onSubmit(action) {
    const result = yield call(submitToServer, action.payload)
    if(result.errors) {
        yield put({type: ERROR, result})
      }
    else {
        yield put({type: SAVED, result})
      }
  }

  async function submitToServer(data) {
    try {
      let response = await fetch('https://dev.sbercu.firelabs.ru/api/auth/resetPass', {
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
