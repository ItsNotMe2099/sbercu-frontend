import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import loginSubmitReducer from 'pages/auth/login/reducer'
import PWRecoverEmailReducer from 'pages/auth/password-forgot/reducer'
import NewPasswordReducer from 'pages/auth/password-reset/reducer';
import registrationReducer from 'pages/auth/registration-invite/reducer';

export default combineReducers({
  form: formReducer,
  loginSubmit: loginSubmitReducer,
  PWRecoverEmail: PWRecoverEmailReducer,
  NewPasswordForm: NewPasswordReducer,
  regReducer: registrationReducer
})
