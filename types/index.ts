import {State as LoginSubmitState} from 'components/auth/login/reducer'
import {State as PWRecoverEmailState} from 'components/auth/password-forgot/reducer'
import {State as NewPWFormState} from 'components/auth/password-reset/reducer'
import {State as regReducerState} from 'components/auth/registration-invite/reducer'
import {CatalogState} from "components/catalog/reducer";
import {CategoryTagState} from 'components/dashboard/TagSelect/reducer'
import {ModalState} from 'components/Modal/reducer'
import {CatalogSearchList} from "components/search/reducer";
import {TagState} from "components/tags/Tag/reducer";
import {TagCategoryState} from "components/tags/TagCategory/reducer";
import {UserState} from "components/users/reducer";
import {JobState} from "components/jobs/reducer";
import {MediaLinkState} from "../components/media-links/reducer";
import {CatalogFavoriteList} from 'components/favorite/reducer'
import {CatalogDeletedList} from 'components/basket/reducer'

export interface IRootState {
    loginSubmit: LoginSubmitState
    PWRecoverEmail: PWRecoverEmailState
    NewPasswordForm: NewPWFormState
    regReducer: regReducerState
    CategoryTagReducer: CategoryTagState
    ModalReducer: ModalState
    tagCategory: TagCategoryState
    catalog: CatalogState
    tag: TagState
    users: UserState
    search: CatalogSearchList,
    jobs: JobState
    mediaLink: MediaLinkState
    favorite: CatalogFavoriteList
    basket: CatalogDeletedList
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
    timeout?: number
}

export interface IResponse {
    data: any
    err: any
}

export interface IVideoElement {
    size: number
    quality: '1080p' | '720p' | '360p'
    duration: number
    filePath: string
}

export interface IMedia {
    id: number
    fileName: string
    filePath: string
    originalName: string
    contentType: string
    type: 'video' | 'document' | 'audio',
    size: number
    videoConverted: boolean
    videoCutting: boolean
    videoElements: IVideoElement[]
    totalViews: number
    lastJob: IJob
}

export interface ICatalogEntry {
    id?: number
    name?: string
    entryType?: 'project' | 'folder' | 'file'
    parentId?: number
    projectManager?: string
    projectManagerMail?: string
    projectCover?: string,
    projectDescription?: string
    projectAudience?: string
    projectTarget?: string
    projectContent?: string
    poster?: string
    userId?: number
    tags?: ITag[],
    canEdit?: boolean
    media?: IMedia,
    createdAt?: string
    link?: string,
    tagsIds?: number[]
    mediaId?: number
    presenters?: string[],
    parents?: ICatalogEntry[],
    highlight?: any,
    inFavorites?: any
    deletedAt?: string
}

export interface ITag {
    id?: number,
    name: string,
    tagCategoryId: number,
}

export interface ITagCategory {
    id?: number
    name: string
    tags: ITag[]
}

export interface CreateProjectData {
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

export interface ConfirmDataModal {
    cancelText?: string,
    confirmColor?: string,
    confirmText?: string,
    description?: string,
    title?: string
    onConfirm: () => void,
    onCancel?: () => void
}

export interface IUser {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    role?: string
    virtualSchoolId?: string
    virtualSchoolLogin?: string
    inviteSent?: boolean
    registeredAt?: string
    resetPasswordToken?: string
    departmentTags?: ITag[]
    departmentTagIds?: number[]
}

export interface IVideoTrimRange {
    id: string,
    start: number
    end: number,
    color: string
}

export interface IJobCodecInfo {
    audio: string,
    video: string,
    format: string
    duration: string,
    audio_details: string[]
    video_details: string[]
}

export interface IJobProgress {
    frames: number,
    percent: number,
    timemark: string,
    currentFps: number,
    targetSize: number,
    currentKbps: number
}

export interface IJob {
    id: number,
    type: "converting" | 'cutting',
    state: "pending" | "started" | "finished" | "canceled" | "error",
    startedAt: string,
    finishedAt: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    userId: number,
    mediaId: number,
    params: any,
    error: null,
    detailes: string,
    codecInfo: IJobCodecInfo
    video_details: string[]
    progress: IJobProgress
    catalog: ICatalogEntry
    user: IUser
    media: IMedia
}
export interface VideoViewHistory{
    mediaId: number
    currentTime: number
    muted: boolean
    volume: number
    rate: number
}