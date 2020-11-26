import {State as LoginSubmitState} from 'components/auth/login/reducer'
import {State as PWRecoverEmailState} from 'components/auth/password-forgot/reducer'
import {State as NewPWFormState} from 'components/auth/password-reset/reducer'
import {State as regReducerState} from 'components/auth/registration-invite/reducer'
import { CatalogState } from "components/catalog/reducer";
import {CategoryTagState} from 'components/dashboard/TagSelect/reducer'
import {ModalState} from 'components/Modal/reducer'
import {CreateFolderState} from 'components/layout/Header/components/CreateFolder/reducer'
import { TagCategoryState } from "components/tags/TagCategory/reducer";

export interface IRootState {
  loginSubmit: LoginSubmitState
  PWRecoverEmail: PWRecoverEmailState
  NewPasswordForm: NewPWFormState
  regReducer: regReducerState
  CategoryTagReducer: CategoryTagState
  ModalReducer: ModalState
  CreateFolderReducer: CreateFolderState
  tagCategory: TagCategoryState
  catalog: CatalogState
}

export interface BaseAction {
  type: string
  payload: any
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
export interface ICatalogEntry {
  id: number
  name: string
  entryType: 'project' | 'folder' | 'file' | 'video' | 'file'
  parentId?: number
  projectManager?: string
  projectManagerMail?: string
  projectCover?: string,
  projectDescription?: string
  projectAudience?: string
  projectTarget?: string
  projectContent?: string
  userId?: number
  tags?: ITag[],
  createdAt?: string
  link?: string,
}
export interface ITag {
  id: number,
  name: string,
  tagCategoryId: number,
}
export interface ITagCategory {
  id: number
  name: string
  tags: ITag[]
}
export interface CreateProjectData{
  name?: string
  entryType?: string
  projectManager?: string
  projectManagerMail?: string
  projectCover?: string
  projectDescription?: string
  projectAudience?: string
  projectTarget?: string
  projectContent?: string
  tagsIds?: number[]
}
