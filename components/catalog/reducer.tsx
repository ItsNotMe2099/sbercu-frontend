import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogState {
  list: ICatalogEntry[],
  listTotal?: number,
  basePath?: string,
  currentCatalogId?: number,
  parents: ICatalogEntry[],
  projects: ICatalogEntry[],
  projectsTotal?: number,
  currentCatalogItem?: ICatalogEntry,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
  parentsLoading: boolean,
}

const initialState: CatalogState = {
  list: [],
  projects: [],
  parents: [],
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
  parentsLoading: false,
}

export default function CatalogReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.SET_CURRENT_CATALOG_ID:
      state.currentCatalogId = action.payload.id
      break
    case ActionTypes.RESET_CATALOG_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
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
      state.projects = action.payload
      state.projectsTotal =  state.projects.length
      state.listLoading = false;
      break
    case ActionTypes.FETCH_CATALOG_PROJECT_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_CATALOG_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_CATALOG_LIST + ApiActionTypes.SUCCESS:
      state.list = action.payload.data
      state.listTotal = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_CATALOG_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_CATALOG_PARENTS:
      state.parentsLoading = true;
      break
    case ActionTypes.FETCH_CATALOG_PARENTS + ApiActionTypes.SUCCESS:
      let path ='/catalog'
      state.parents = action.payload.map(item => {
        const link = `${path}/${item.id}`
        return {...item, link}
      })

        state.basePath = `/catalog/${action.payload.map(i => i.id).join('/')}`
      state.parentsLoading = false;
      break
    case ActionTypes.FETCH_CATALOG_PARENTS + ApiActionTypes.FAIL:
      state.parentsLoading = false;
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
