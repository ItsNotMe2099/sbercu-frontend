import {State as LoginSubmitState} from 'pages/auth/login/reducer'
import {State as PWRecoverEmailState} from 'pages/auth/password-forgot/reducer'
import {State as NewPWFormState} from 'pages/auth/password-reset/reducer'
import {State as regReducerState} from 'pages/auth/registration-invite/reducer'

export interface IRootState {
  loginSubmit: LoginSubmitState
  PWRecoverEmail: PWRecoverEmailState
  NewPasswordForm: NewPWFormState
  regReducer: regReducerState
}
