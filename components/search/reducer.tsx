import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogSearchList {
  files: ICatalogEntry[],
  filesTotal?: number,
  projects: ICatalogEntry[],
  projectsTotal?: number,
  folders: ICatalogEntry[],
  foldersTotal?: number,
  listProjectsLoading: boolean,
  listFilesLoading: boolean,
  listFoldersLoading: boolean,
  autoCompleteFiles: ICatalogEntry[],
  autoCompleteFilesTotal: number,
  autocompleteFilesLoading: boolean,
  autoCompleteFolders: ICatalogEntry[],
  autoCompleteFoldersTotal: number,
  autocompleteFoldersLoading: boolean,
  autoCompleteProjects: ICatalogEntry[],
  autoCompleteProjectsTotal: number,
  autocompleteProjectsLoading: boolean,

}

const initialState: CatalogSearchList = {
  files: [],
  projects: [],
  folders: [],
  listProjectsLoading: false,
  listFilesLoading: false,
  listFoldersLoading: false,
  projectsTotal: 0,
  filesTotal: 0,
  foldersTotal: 0,
  autoCompleteFiles: [],
  autoCompleteProjects: [],
  autoCompleteFolders: [],
  autocompleteProjectsLoading: false,
  autocompleteFilesLoading: false,
  autocompleteFoldersLoading: false,
  autoCompleteProjectsTotal: 0,
  autoCompleteFilesTotal: 0,
  autoCompleteFoldersTotal: 0,
}

export default function CatalogSearchReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_CATALOG_PROJECTS_SEARCH_LIST:
      state.listProjectsLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_PROJECTS_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.projects = [...state.projects, ...action.payload.data.map(item => ({...item, id: item.projectId}))];
      state.projectsTotal = action.payload.total
      state.listProjectsLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_PROJECTS_SEARCH_LIST + ApiActionTypes.FAIL:
      state.listProjectsLoading = false;
      break;

    case ActionTypes.FETCH_CATALOG_FILES_SEARCH_LIST:
      state.listFilesLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_FILES_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.files = [...state.files, ...action.payload.data];
      state.filesTotal = action.payload.total
      state.listFilesLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_FILES_SEARCH_LIST + ApiActionTypes.FAIL:
      state.listFilesLoading = false;
      break;

    case ActionTypes.FETCH_CATALOG_FOLDERS_SEARCH_LIST:
      state.listFoldersLoading = true;
      break;
    case ActionTypes.FETCH_CATALOG_FOLDERS_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.folders = [...state.folders, ...action.payload.data];
      state.foldersTotal = action.payload.total
      state.listFoldersLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_FOLDERS_SEARCH_LIST + ApiActionTypes.FAIL:
      state.listFoldersLoading = false;
      break;

    case ActionTypes.RESET_SEARCH:
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

    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_PROJECTS_SEARCH_LIST:
      state.autocompleteProjectsLoading = true
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_PROJECTS_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.autoCompleteProjects =  action.payload.data.map(item => ({...item, id: item.projectId}));
      state.autocompleteProjectsLoading = false;
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_PROJECTS_SEARCH_LIST + ApiActionTypes.FAIL:
      state.autocompleteProjectsLoading = false
      break;

    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FILES_SEARCH_LIST:
      state.autocompleteFilesLoading = true
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FILES_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.autoCompleteFiles = action.payload.data;
      state.autocompleteFilesLoading = false;
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FILES_SEARCH_LIST + ApiActionTypes.FAIL:
      state.autocompleteFilesLoading = false
      break;

    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FOLDERS_SEARCH_LIST:
      state.autocompleteFoldersLoading = true
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FOLDERS_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.autoCompleteFolders = action.payload.data;
      console.log("SetAutoCompleteFodlers", state.autoCompleteFolders);
      state.autocompleteFoldersLoading = false;
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FOLDERS_SEARCH_LIST + ApiActionTypes.FAIL:
      state.autocompleteFoldersLoading = false
      break;

    case ActionTypes.RESET_AUTOCOMPLETE_SEARCH:
      state.autocompleteFilesLoading = false;
      state.autocompleteProjectsLoading = false;
      state.autocompleteFoldersLoading = false;
      state.autoCompleteProjects = [];
      state.autoCompleteFiles = [];
      state.autoCompleteFolders = [];
      break;
  }

  return state
}
