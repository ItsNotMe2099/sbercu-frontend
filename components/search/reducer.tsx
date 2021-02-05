import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogSearchList {
  files: ICatalogEntry[],
  filesTotal?: number,
  projects: ICatalogEntry[],
  projectsTotal?: number,
  listProjectsLoading: boolean,
  listFilesLoading: boolean,
  autoCompleteFiles: ICatalogEntry[],
  autoCompleteFilesTotal: number,
  autoCompleteProjects: ICatalogEntry[],
  autoCompleteProjectsTotal: number,
  autocompleteProjectsLoading: boolean,
  autocompleteFilesLoading: boolean,
}

const initialState: CatalogSearchList = {
  files: [],
  projects: [],
  listProjectsLoading: false,
  listFilesLoading: false,
  projectsTotal: 0,
  filesTotal: 0,
  autoCompleteFiles: [],
  autoCompleteProjects: [],
  autocompleteProjectsLoading: false,
  autocompleteFilesLoading: false,
  autoCompleteProjectsTotal: 0,
  autoCompleteFilesTotal: 0,
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

    case ActionTypes.RESET_SEARCH:
      state.listFilesLoading = false;
      state.listProjectsLoading = false;
      state.files = [];
      state.projects = [];
      state.filesTotal = 0;
      state.projectsTotal = 0;
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

    case ActionTypes.RESET_AUTOCOMPLETE_SEARCH:
      state.autocompleteFilesLoading = false;
      state.autocompleteProjectsLoading = false;
      state.autoCompleteProjects = [];
      state.autoCompleteFiles = [];
      break;
  }

  return state
}
