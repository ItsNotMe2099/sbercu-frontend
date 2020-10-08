import { all } from 'redux-saga/effects'
import { watchOnLoginSubmit } from 'pages/auth-page/sagas'
import { watchOnEmailSubmit } from 'pages/password-recovery-email/sagas'

export const rootSaga = function* root() {
  yield all([watchOnLoginSubmit(),
    watchOnEmailSubmit()]);
};
