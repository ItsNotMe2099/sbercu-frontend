import {State as LoginSubmitState} from 'pages/auth-page/reducer'
import {State as PWRecoverEmailState} from 'pages/password-recovery-email/reducer'
import {State as NewPWFormState} from 'pages/password-recovery-new/reducer'
import {State as regReducerState} from 'pages/auth-control/reducer'

export interface IRootState {
  loginSubmit: LoginSubmitState
  PWRecoverEmail: PWRecoverEmailState
  NewPasswordForm: NewPWFormState
  regReducer: regReducerState
}