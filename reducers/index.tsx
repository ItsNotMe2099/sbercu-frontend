import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import loginSubmitReducer from 'pages/auth-page/reducer'
import PWRecoverEmailReducer from 'pages/password-recovery-email/reducer'

export default combineReducers({
  form: formReducer,
  loginSubmit: loginSubmitReducer,
  PWRecoverEmail: PWRecoverEmailReducer
})