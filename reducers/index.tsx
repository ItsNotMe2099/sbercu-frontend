import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import loginSubmitReducer from 'components/auth/login/reducer'
import PWRecoverEmailReducer from 'components/auth/password-forgot/reducer'
import NewPasswordReducer from 'components/auth/password-reset/reducer';
import registrationReducer from 'components/auth/registration-invite/reducer';

export default combineReducers({
  form: formReducer,
  loginSubmit: loginSubmitReducer,
  PWRecoverEmail: PWRecoverEmailReducer,
  NewPasswordForm: NewPasswordReducer,
  regReducer: registrationReducer
})
