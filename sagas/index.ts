import catalogSaga from "components/catalog/sagas";
import tagCategorySaga from "components/tags/TagCategory/sagas";
import { all } from 'redux-saga/effects'
import { watchOnLoginSubmit } from 'components/auth/login/sagas'
import { watchOnEmailSubmit } from 'components/auth/password-forgot/sagas'
import { watchOnNewPasswordSave } from 'components/auth/password-reset/sagas';
import { watchOnRegistration } from 'components/auth/registration-invite/sagas';
import {createFolderSaga} from 'components/layout/Header/components/CreateFolder/sagas';
import apiSaga from "sagas/apiSaga";

export const rootSaga = function* root() {
  yield all([
    apiSaga(),
      watchOnLoginSubmit(),
    watchOnEmailSubmit(),
    watchOnNewPasswordSave(),
    watchOnRegistration(),
    createFolderSaga(),
    tagCategorySaga(),
      catalogSaga(),
  ])
};
