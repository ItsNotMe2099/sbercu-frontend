import {State as LoginSubmitState} from 'components/auth/login/reducer'
import {State as PWRecoverEmailState} from 'components/auth/password-forgot/reducer'
import {State as NewPWFormState} from 'components/auth/password-reset/reducer'
import {State as regReducerState} from 'components/auth/registration-invite/reducer'
import {CategoryTagState} from 'components/dashboard/TagSelect/reducer'
import {ModalState} from 'components/Modal/reducer'
import {CreateFolderState} from 'components/layout/Header/components/CreateFolder/reducer'

export interface IRootState {
  loginSubmit: LoginSubmitState
  PWRecoverEmail: PWRecoverEmailState
  NewPasswordForm: NewPWFormState
  regReducer: regReducerState
  CategoryTagReducer: CategoryTagState
  ModalReducer: ModalState
  CreateFolderReducer: CreateFolderState
}

export interface IRequestData {
  url: string
  method?: 'POST' | 'PUT' | 'DELETE' | 'GET'
  data?: any
  token?: string
  host?: string
}

export interface IResponse {
  data: any
  err: any
}
