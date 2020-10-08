import {State as LoginSubmitState} from 'pages/auth-page/reducer'
import {State as PWRecoverEmailState} from 'pages/password-recovery-email/reducer'

export interface IRootState {
  loginSubmit: LoginSubmitState
  PWRecoverEmail: PWRecoverEmailState
}