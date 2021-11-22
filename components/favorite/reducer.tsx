import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";
import CatalogActionTypes from "components/catalog/const";

export interface CatalogFavoriteList {
  files: ICatalogEntry[],
  filesTotal?: number,
  projects: ICatalogEntry[],
  projectsTotal?: number,
  folders: ICatalogEntry[],
  foldersTotal?: number,
  listProjectsLoading: boolean,
  listFilesLoading: boolean,
  listFoldersLoading: boolean,

}

const initialState: CatalogFavoriteList = {
  files: [],
  projects: [],
  folders: [],
  listProjectsLoading: false,
  listFilesLoading: false,
  listFoldersLoading: false,
  projectsTotal: 0,
  filesTotal: 0,
  foldersTotal: 0
}

export default function CatalogFavoriteReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_CATALOG_PROJECTS_FAVORITE_LIST:
      state.listProjectsLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_PROJECTS_FAVORITE_LIST + ApiActionTypes.SUCCESS:
      state.projects = [...state.projects, ...action.payload.data.map(item => ({...item, inFavorites: true}))];
      state.projectsTotal = action.payload.total
      state.listProjectsLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_PROJECTS_FAVORITE_LIST + ApiActionTypes.FAIL:
      state.listProjectsLoading = false;
      break;

    case ActionTypes.FETCH_CATALOG_FILES_FAVORITE_LIST:
      state.listFilesLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_FILES_FAVORITE_LIST + ApiActionTypes.SUCCESS:
      state.files = [...state.files, ...action.payload.data.map(i =>({...i, inFavorites: true}))];
      state.filesTotal = action.payload.total
      state.listFilesLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_FILES_FAVORITE_LIST + ApiActionTypes.FAIL:
      state.listFilesLoading = false;
      break;

    case ActionTypes.FETCH_CATALOG_FOLDERS_FAVORITE_LIST:
      state.listFoldersLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_FOLDERS_FAVORITE_LIST + ApiActionTypes.SUCCESS:
      state.folders = [...state.folders, ...action.payload.data.map(i =>({...i, inFavorites: true}))];
      state.foldersTotal = action.payload.total
      state.listFoldersLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_FOLDERS_FAVORITE_LIST + ApiActionTypes.FAIL:
      state.listFoldersLoading = false;
      break;

    case CatalogActionTypes.CATALOG_DELETE_FROM_FAVORITE:
      if( action.payload.entryType === 'project') {
        state.projects = state.projects.filter(i => i.id !== action.payload.id);
        state.projectsTotal = state.projectsTotal - 1;
      }
      if( action.payload.entryType === 'folder') {
        state.folders = state.folders.filter(i => i.id !== action.payload.id);
        state.foldersTotal = state.foldersTotal - 1;
      }
      if( action.payload.entryType === 'file') {
        state.files = state.files.filter(i => i.id !== action.payload.id);
        state.filesTotal = state.filesTotal - 1;
      }
      break
    case ActionTypes.RESET_FAVORITE:
      state.listFilesLoading = false;
      state.listProjectsLoading = false;
      state.listFoldersLoading = false;
      state.files = [];
      state.projects = [];
      state.folders = [];
      state.filesTotal = 0;
      state.projectsTotal = 0;
      state.foldersTotal = 0;
      break;
  }

  return state
}
