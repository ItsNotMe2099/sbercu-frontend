import CatalogReducer from "components/catalog/reducer";
import CatalogSearchReducer from "components/search/reducer";
import TagReducer from "components/tags/Tag/reducer";
import UserReducer from "components/users/reducer";
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import loginSubmitReducer from 'components/auth/login/reducer'
import PWRecoverEmailReducer from 'components/auth/password-forgot/reducer'
import NewPasswordReducer from 'components/auth/password-reset/reducer';
import registrationReducer from 'components/auth/registration-invite/reducer';
import CategoryTagReducer from 'components/dashboard/TagSelect/reducer';
import ModalReducer from 'components/Modal/reducer';
import CreateTagCategoryReducer from 'components/tags/TagCategory/reducer';
import JobReducer from "../components/jobs/reducer";
import MediaLinkReducer from "../components/media-links/reducer";

export default combineReducers({
  form: formReducer,
  loginSubmit: loginSubmitReducer,
  PWRecoverEmail: PWRecoverEmailReducer,
  NewPasswordForm: NewPasswordReducer,
  regReducer: registrationReducer,
  CategoryTagReducer: CategoryTagReducer,
  ModalReducer: ModalReducer,
  tagCategory: CreateTagCategoryReducer,
  catalog: CatalogReducer,
  tag: TagReducer,
  users: UserReducer,
  search: CatalogSearchReducer,
  jobs: JobReducer,
  mediaLink: MediaLinkReducer
})
