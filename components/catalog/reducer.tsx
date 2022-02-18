import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogState {
    list: ICatalogEntry[],
    listTotal?: number,
    publicLink?: string
    myUploadedFilesList: ICatalogEntry[],
    myUploadedFilesListLoading: boolean,
    myUploadedFilesListTotal?: number,
    basePath?: string,
    currentCatalogId?: number,
    projects: ICatalogEntry[],
    projectsTotal?: number,
    currentCatalogItem?: ICatalogEntry,
    formIsSuccess: boolean
    formError: string,
    listLoading: boolean,
    currentLoading: boolean
    formLoading: boolean,
    parentsLoading: boolean,
    page: number
    isSubmitting?: boolean
    filesFromDropZone: File[],
    updateIds: number[]
    selectedIds?: number[]
}

const initialState: CatalogState = {
    list: [],
    projects: [],
    myUploadedFilesList: [],
    myUploadedFilesListLoading: false,
    formIsSuccess: false,
    formError: '',
    formLoading: false,
    listLoading: false,
    currentLoading: false,
    parentsLoading: false,
    page: 1,
    listTotal: 0,
    filesFromDropZone: [],
    updateIds: [],
    selectedIds: []
}

export default function CatalogReducer(state = { ...initialState }, action) {
    switch (action.type) {
        case ActionTypes.FETCH_MY_UPLOADED_FILES:
            state.myUploadedFilesListLoading = true;
            break;
        case ActionTypes.FETCH_MY_UPLOADED_FILES + ApiActionTypes.SUCCESS:
            state.myUploadedFilesList = [...state.myUploadedFilesList, ...action.payload.data]
            state.myUploadedFilesListLoading = false;
            state.myUploadedFilesListTotal = action.payload.total
            break;
        case ActionTypes.FETCH_MY_UPLOADED_FILES + ApiActionTypes.FAIL:
            state.myUploadedFilesListLoading = false;
            break;
        case ActionTypes.RESET_CATALOG_ITEM:
            state.currentCatalogItem = null;
            break;
        case ActionTypes.SET_CURRENT_CATALOG_ID:
            state.currentCatalogId = action.payload.id
            break
        case ActionTypes.RESET_CATALOG_FORM:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = false;
            break

        case ActionTypes.SET_CATALOG_PAGE:
            state.page = action.payload.page
            break

        case ActionTypes.CREATE_CATALOG_REQUEST:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = true;
            break
        case ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS:
            state.formError = ''
            state.formIsSuccess = true;
            state.formLoading = false;
            break
        case ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.FAIL:
            state.formError = action.payload.error ||  action.payload.message || 'Произошла ошибка'
            state.formIsSuccess = false;
            state.formLoading = false;
            break
        case ActionTypes.UPDATE_CATALOG_REQUEST:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = true;
            break
        case ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS:
            state.formError = ''
            state.formIsSuccess = true;
            state.formLoading = false;
            break
        case ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.FAIL:
            state.formError = action.payload.error ||  action.payload.message || 'Произошла ошибка'
            state.formIsSuccess = false;
            state.formLoading = false;
            break
        case ActionTypes.DELETE_CATALOG_REQUEST:
            state.formError = ''
            state.formIsSuccess = false;
            state.formLoading = true;
            break
        case ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.SUCCESS:
            state.formError = ''
            state.formIsSuccess = true;
            state.formLoading = false;
            break
        case ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.FAIL:
            state.formError = action.payload.error || 'Unknown error'
            state.formIsSuccess = false;
            state.formLoading = false;
            break
        case ActionTypes.FETCH_CATALOG_PROJECT_LIST:
            state.listLoading = true;
            break
        case ActionTypes.FETCH_CATALOG_PROJECT_LIST + ApiActionTypes.SUCCESS:
            state.projects = [...state.projects, ...action.payload.data]
            state.projectsTotal = action.payload.total
            state.listLoading = false;
            break
        case ActionTypes.FETCH_CATALOG_PROJECT_LIST + ApiActionTypes.FAIL:
            state.listLoading = false;
            break

        case ActionTypes.FETCH_CATALOG_LIST:
            state.listLoading = true;
            break
        case ActionTypes.FETCH_CATALOG_LIST + ApiActionTypes.SUCCESS:
            if(state.page > 1) {
                state.list = [...state.list, ...action.payload.data]
            }else{
                state.list = action.payload.data
            }
            state.updateIds = state.list.filter(item => item?.media?.videoCutting || ['pending', 'started'].includes(item?.media?.lastJob?.state)).map(job => job.id)
            state.listTotal = action.payload.total
            state.listLoading = false;
            break
        case ActionTypes.FETCH_CATALOG_LIST + ApiActionTypes.FAIL:
            state.listLoading = false;
            break

        case ActionTypes.FETCH_CATALOG_FILES:
            state.listLoading = true;
            break
        case ActionTypes.FETCH_CATALOG_FILES + ApiActionTypes.SUCCESS:
            if(state.page > 1) {
                state.list = [...state.list, ...action.payload.data]
            }else{
                state.list = action.payload.data
            }
            state.updateIds = state.list.filter(item => item?.media?.videoCutting || ['pending', 'started'].includes(item?.media?.lastJob?.state)).map(job => job.id)
            state.listTotal = action.payload.total
            state.listLoading = false;
            break
        case ActionTypes.FETCH_CATALOG_FILES + ApiActionTypes.FAIL:
            state.listLoading = false;
            break

        case ActionTypes.FETCH_CATALOG_LIST_BY_IDS + ApiActionTypes.SUCCESS:
            for(let job of action.payload.data){
                state.list = state.list.map(item => item.id === job.id ? job : item)
            }
            state.updateIds = state.list.filter(item => item?.media?.videoCutting || ['pending', 'started'].includes(item?.media?.lastJob?.state)).map(job => job.id)
            break;

        case ActionTypes.CATALOG_ADD_TO_FAVORITE:
            if(state.currentCatalogItem && state.currentCatalogItem?.id === action.payload.id){
                state.currentCatalogItem = {...state.currentCatalogItem, inFavorites: true}
            }
            state.list = state.list.map(i => (i.id === action.payload.id ? {...i, inFavorites: true} : i));
            state.projects = state.projects.map(i => (i.id === action.payload.id ? {...i, inFavorites: true} : i));
            state.myUploadedFilesList = state.myUploadedFilesList.map(i => (i.id === action.payload.id ? {...i, inFavorites: true} : i));
            break
        case ActionTypes.CATALOG_DELETE_FROM_FAVORITE:
            if(state.currentCatalogItem && state.currentCatalogItem?.id === action.payload.id){
                state.currentCatalogItem = {...state.currentCatalogItem, inFavorites: false}
            }
            state.list = state.list.map(i => (i.id === action.payload.id ? {...i, inFavorites: false} : i));
            state.projects = state.projects.map(i => (i.id === action.payload.id ? {...i, inFavorites: false} : i));
            state.myUploadedFilesList = state.myUploadedFilesList.map(i => (i.id === action.payload.id ? {...i, inFavorites: false} : i));
            break

        case ActionTypes.RESET_CATALOG_LIST:
            state.listLoading = false;
            state.page = 1

            console.log("RESET")
            if (!action.payload?.shallow) {
                state.selectedIds = [];
                state.list = []
                state.listTotal = 0
                state.projects = [];
                state.projectsTotal = 0;
            }

            break
        case ActionTypes.RESET_MY_UPLOADED_FILES:
            state.myUploadedFilesList = [];
            state.myUploadedFilesListTotal = 0;
            state.myUploadedFilesListLoading = false;
            break;

        case ActionTypes.FETCH_CATALOG_ITEM_REQUEST:
            if(!action.payload.shallow) {
                state.currentLoading = true;
            }
            break
        case ActionTypes.FETCH_CATALOG_ITEM_REQUEST + ApiActionTypes.SUCCESS:
            let path = '/catalog'
            action.payload.parents?.splice(-1, 1);
            state.currentCatalogItem = {
                ...action.payload,
                parents: action.payload.parents?.map(item => {
                    const link = `${path}/${item.id}`
                    return { ...item, link };
                })
            }
            state.basePath = `/catalog/${action.payload.parents?.map(i => i.id).join('/')}`
            state.currentLoading = false;
            break
        case ActionTypes.SET_CATALOG_MEDIA_ITEM: {
            let path = '/catalog'
            action.payload.parents?.splice(-1, 1);
            state.currentCatalogItem = {
                ...action.payload,
                parents: action.payload.parents?.map(item => {
                    const link = `${path}/${item.id}`
                    return {...item, link};
                })
            }
            state.basePath = `/catalog/${action.payload.parents?.map(i => i.id).join('/')}`
            state.currentLoading = false;
            break
        }
        case ActionTypes.FETCH_CATALOG_ITEM_REQUEST + ApiActionTypes.FAIL:
            state.currentLoading = false;
            break

        case ActionTypes.CUT_VIDEO_REQUEST :
            state.isSubmitting = true;
            break
        case ActionTypes.CUT_VIDEO_REQUEST  + ApiActionTypes.SUCCESS:
        case ActionTypes.CUT_VIDEO_REQUEST  + ApiActionTypes.FAIL:
            state.isSubmitting = false;
            break

        case ActionTypes.UPDATE_CATALOG_ITEM_STATE :
           if( state.currentCatalogItem === action.payload.id){
               state.currentCatalogItem = {... state.currentCatalogItem, ...action.payload.data};
           }else{
               state.list = state.list.map(i => (i.id === action.payload.id ? {...i,  ...action.payload.data} : i));
           }
            break


        case ActionTypes.FETCH_CATALOG:
            state.currentLoading = true;
            break
        case ActionTypes.FETCH_CATALOG + ApiActionTypes.SUCCESS:
            state.currentCatalogItem = action.payload
            state.currentLoading = false;
            break
        case ActionTypes.FETCH_CATALOG + ApiActionTypes.FAIL:
            state.currentLoading = false;
            break
        case ActionTypes.SET_FILES_FROM_DROPZONE:
            state.filesFromDropZone = action.payload.files;
            break
        case ActionTypes.RESET_FILES_FROM_DROPZONE:
            state.filesFromDropZone = []
            break

    }

    return state
}
