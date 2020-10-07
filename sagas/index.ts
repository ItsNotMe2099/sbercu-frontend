import { all, fork } from 'redux-saga/effects';
import { watchOnSubmit } from './sagas';

export const rootSaga = function* root() {
  yield all([watchOnSubmit()]);
};
