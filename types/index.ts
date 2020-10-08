import {State as LoginSubmitState} from 'pages/auth-page/reducer'
import {State as PWRecoverEmailState} from 'pages/password-recovery-email/reducer'
import {State as NewPWFormState} from 'pages/password-recovery-new/reducer'

export interface IRootState {
  loginSubmit: LoginSubmitState
  PWRecoverEmail: PWRecoverEmailState
  NewPasswordForm: NewPWFormState
}