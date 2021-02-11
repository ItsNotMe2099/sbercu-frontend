import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogState {
    list: ICatalogEntry[],
    listTotal?: number,
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
            state.formError = action.payload.error || 'Unknown error'
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
            state.formError = action.payload.error || 'Unknown error'
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
            state.listTotal = action.payload.total
            state.listLoading = false;
            break
        case ActionTypes.FETCH_CATALOG_LIST + ApiActionTypes.FAIL:
            state.listLoading = false;
            break

        case ActionTypes.RESET_CATALOG_LIST:
            state.listLoading = false;
            state.page = 1

            console.log("RESET")
            if (!action.payload?.shallow) {
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

        case ActionTypes.FETCH_CATALOG_ITEM:
            state.currentLoading = true;
            break
        case ActionTypes.FETCH_CATALOG_ITEM + ApiActionTypes.SUCCESS:
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
        case ActionTypes.FETCH_CATALOG_ITEM + ApiActionTypes.FAIL:
            state.currentLoading = false;
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
    }

    return state
}
