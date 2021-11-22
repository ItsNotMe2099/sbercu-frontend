import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogDeletedList {
  files: ICatalogEntry[],
  filesTotal?: number,
  projects: ICatalogEntry[],
  projectsTotal?: number,
  folders: ICatalogEntry[],
  foldersTotal?: number,
  listProjectsLoading: boolean,
  listFilesLoading: boolean,
  listFoldersLoading: boolean,
  currentLoadingItems: number[],
  isBasketCleaning: boolean
}

const initialState: CatalogDeletedList = {
  files: [],
  projects: [],
  folders: [],
  listProjectsLoading: false,
  listFilesLoading: false,
  listFoldersLoading: false,
  projectsTotal: 0,
  filesTotal: 0,
  foldersTotal: 0,
  currentLoadingItems: [],
  isBasketCleaning: false
}

export default function CatalogDeletedReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_CATALOG_PROJECTS_DELETED_LIST:
      state.listProjectsLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_PROJECTS_DELETED_LIST + ApiActionTypes.SUCCESS:
      state.projects = [...state.projects, ...action.payload.data.map(item => ({...item, id: item.projectId}))];
      state.projectsTotal = action.payload.total
      state.listProjectsLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_PROJECTS_DELETED_LIST + ApiActionTypes.FAIL:
      state.listProjectsLoading = false;
      break;

    case ActionTypes.FETCH_CATALOG_FILES_DELETED_LIST:
      state.listFilesLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_FILES_DELETED_LIST + ApiActionTypes.SUCCESS:
      state.files = [...state.files, ...action.payload.data];
      state.filesTotal = action.payload.total
      state.listFilesLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_FILES_DELETED_LIST + ApiActionTypes.FAIL:
      state.listFilesLoading = false;
      break;

    case ActionTypes.FETCH_CATALOG_FOLDERS_DELETED_LIST:
      state.listFoldersLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_FOLDERS_DELETED_LIST + ApiActionTypes.SUCCESS:
      state.folders = [...state.folders, ...action.payload.data];
      state.foldersTotal = action.payload.total
      state.listFoldersLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_FOLDERS_DELETED_LIST + ApiActionTypes.FAIL:
      state.listFoldersLoading = false;
      break;

    case ActionTypes.RESTORE_CATALOG_ITEM_REQUEST:
      state.currentLoadingItems = [...state.currentLoadingItems, action.payload.id];
      break;
    case ActionTypes.RESTORE_CATALOG_ITEM_REQUEST + ApiActionTypes.SUCCESS:
      state.currentLoadingItems = state.currentLoadingItems.filter( i => i != action.payload.data.id);
      break;
    case ActionTypes.RESTORE_CATALOG_ITEM_REQUEST + ApiActionTypes.FAIL:
      state.currentLoadingItems = state.currentLoadingItems.filter( i => i != action.payload.data.id);
      break;

    case ActionTypes.DELETE_CATALOG_ITEM_REQUEST:
      state.currentLoadingItems = [...state.currentLoadingItems, action.payload.id];
      break;
    case ActionTypes.DELETE_CATALOG_ITEM_REQUEST + ApiActionTypes.SUCCESS:
      state.currentLoadingItems = state.currentLoadingItems.filter( i => i != action.payload.data.id);
      state.folders = state.folders.filter( i => i.id != action.payload.data.id);
      state.files = state.files.filter( i => i.id != action.payload.data.id);
      state.projects = state.projects.filter( i => i.id != action.payload.data.id);
      break;
    case ActionTypes.DELETE_CATALOG_ITEM_REQUEST + ApiActionTypes.FAIL:
      state.currentLoadingItems = state.currentLoadingItems.filter( i => i != action.payload.data.id);
      break;
    case ActionTypes.CLEAN_BASKET_REQUEST:
      state.isBasketCleaning = true;
      break;
    case ActionTypes.CLEAN_BASKET_REQUEST + ApiActionTypes.SUCCESS:
      state.isBasketCleaning = false;
      break;
    case ActionTypes.CLEAN_BASKET_REQUEST + ApiActionTypes.FAIL:
      state.isBasketCleaning = false;
      break;

    case ActionTypes.RESET_DELETED:
      state.listFilesLoading = false;
      state.listProjectsLoading = false;
      state.listFoldersLoading = false;
      state.files = [];
      state.projects = [];
      state.folders = [];
      state.filesTotal = 0;
      state.projectsTotal = 0;
      state.foldersTotal = 0;
      state.isBasketCleaning = false;
      state.currentLoadingItems = [];
      break;
  }

  return state
}
