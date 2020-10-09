import { all } from 'redux-saga/effects'
import { watchOnLoginSubmit } from 'pages/auth-page/sagas'
import { watchOnEmailSubmit } from 'pages/password-recovery-email/sagas'
import { watchOnNewPasswordSave } from 'pages/password-recovery-new/sagas';
import { watchOnRegistration } from 'pages/auth-control/sagas';

export const rootSaga = function* root() {
  yield all([watchOnLoginSubmit(),
    watchOnEmailSubmit(),
    watchOnNewPasswordSave(),
    watchOnRegistration()]);
};
