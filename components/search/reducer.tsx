import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogSearchList {
  files: ICatalogEntry[],
  filesTotal?: number,
  projects: ICatalogEntry[],
  projectsTotal?: number,
  listLoading: boolean,
  autoCompleteFiles: ICatalogEntry[],
  autoCompleteFilesTotal: number,
  autoCompleteProjects: ICatalogEntry[],
  autoCompleteProjectsTotal: number,
  autoCompleteListLoading: boolean
}

const initialState: CatalogSearchList = {
  files: [],
  projects: [],
  listLoading: false,
  projectsTotal: 0,
  filesTotal: 0,
  autoCompleteFiles: [],
  autoCompleteProjects: [],
  autoCompleteListLoading: false,
  autoCompleteProjectsTotal: 0,
  autoCompleteFilesTotal: 0,
}

export default function CatalogSearchReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_CATALOG_SEARCH_LIST:
      state.listLoading = true;
      break;
    case ActionTypes.RESET_AUTOCOMPLETE_SEARCH:
      state.listLoading = false;
      state.autoCompleteProjects = [];
      state.autoCompleteFiles = [];
      break;
    case ActionTypes.FETCH_CATALOG_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.projects = action.payload.data.filter(item => item.entryType === 'project').map(item => ({...item, id: item.projectId}));
      state.projectsTotal = state.projects.length
      state.files = action.payload.data.filter(item => item.entryType === 'file');
      state.filesTotal = state.files.length
      state.listLoading = false;
      break;
    case ActionTypes.FETCH_CATALOG_SEARCH_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_SEARCH_LIST:
      state.autoCompleteListLoading = true
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.autoCompleteProjects = action.payload.data.filter(item => item.entryType === 'project').map(item => ({...item, id: item.projectId}));
      state.autoCompleteFiles = action.payload.data.filter(item => item.entryType === 'file');
      state.autoCompleteListLoading = false;
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_SEARCH_LIST + ApiActionTypes.FAIL:
      state.autoCompleteListLoading = false
      break;
  }

  return state
}
