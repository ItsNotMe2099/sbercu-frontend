import ActionTypes from "pages/password-recovery-email/const";
import { takeEvery, call, put } from 'redux-saga/effects';
import { ERROR, SEND, SENDED } from 'const'

export function* watchOnEmailSubmit() {
    yield takeEvery(
        ActionTypes.PASSWORD_RECOVERY_SUBMIT,
        onSubmit
    );
}

function* onSubmit(action) {
    try {
        const result = yield call(submitToServer, action.payload)
        yield put({ type: ActionTypes.PASSWORD_RECOVERY_SUCCESS, payload: result })
    } catch (e) {

        yield put({ type: ActionTypes.PASSWORD_RECOVERY_ERROR, payload: e.message })

    }
}

async function submitToServer(data) {
    let response = await fetch('https://dev.sbercu.firelabs.ru/api/auth/forgot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status >= 200 && response.status <= 299) {
        let responseJson = await response.json()
        return responseJson
    } else {
        let responseJson = await response.json()
        throw new Error(responseJson.errors);
    }
}
