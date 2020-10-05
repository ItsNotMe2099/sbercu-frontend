import { all, fork } from 'redux-saga/effects';
import { watchSaga } from './sagas';

export const rootSaga = function* root() {
  yield all([fork(watchSaga)]);
};
