import catalogSaga from "components/catalog/sagas";
import catalogSearchSaga from "components/search/sagas";
import tagSaga from "components/tags/Tag/sagas";
import tagCategorySaga from "components/tags/TagCategory/sagas";
import userSaga from "components/users/sagas";
import { all } from 'redux-saga/effects'
import watchOnLoginSubmit  from 'components/auth/login/sagas'
import watchOnEmailSubmit from 'components/auth/password-forgot/sagas'
import { watchOnNewPasswordSave } from 'components/auth/password-reset/sagas';
import { watchOnRegistration } from 'components/auth/registration-invite/sagas';
import apiSaga from "sagas/apiSaga";

export const rootSaga = function* root() {
    yield all([
        apiSaga(),
        watchOnLoginSubmit(),
        watchOnEmailSubmit(),
        watchOnNewPasswordSave(),
        watchOnRegistration(),
        tagCategorySaga(),
        catalogSaga(),
        tagSaga(),
        userSaga(),
        catalogSearchSaga(),
    ])
};
