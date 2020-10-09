import { all } from 'redux-saga/effects'
import { watchOnLoginSubmit } from 'pages/auth/login/sagas'
import { watchOnEmailSubmit } from 'pages/auth/password-forgot/sagas'
import { watchOnNewPasswordSave } from 'pages/auth/password-reset/sagas';
import { watchOnRegistration } from 'pages/auth/registration-invite/sagas';

export const rootSaga = function* root() {
  yield all([watchOnLoginSubmit(),
    watchOnEmailSubmit(),
    watchOnNewPasswordSave(),
    watchOnRegistration()]);
};
