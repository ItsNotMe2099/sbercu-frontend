import ApiActionTypes from "constants/api";
import {ICatalogEntry, ISpeaker, ITagCategory} from "types";
import ActionTypes from "./const"
import CatalogActionTypes from "components/catalog/const";

export interface CatalogSearchList {
  files: ICatalogEntry[],
  filesTotal?: number,
  projects: ICatalogEntry[],
  projectsTotal?: number,
  folders: ICatalogEntry[],
  foldersTotal?: number,
  speakers: ICatalogEntry[],
  speakersTotal?: number,
  listProjectsLoading: boolean,
  listFilesLoading: boolean,
  listFoldersLoading: boolean,
  listSpeakersLoading: boolean,
  autoCompleteFiles: ICatalogEntry[],
  autoCompleteFilesTotal: number,
  autocompleteFilesLoading: boolean,
  autoCompleteFolders: ICatalogEntry[],
  autoCompleteFoldersTotal: number,
  autocompleteFoldersLoading: boolean,
  autoCompleteProjects: ICatalogEntry[],
  autoCompleteProjectsTotal: number,
  autocompleteProjectsLoading: boolean,
  autoCompleteSpeakers: ISpeaker[],
  autoCompleteSpeakersTotal: number,
  autocompleteSpeakersLoading: boolean,

}

const initialState: CatalogSearchList = {
  files: [],
  projects: [],
  folders: [],
  speakers: [],
  listProjectsLoading: false,
  listFilesLoading: false,
  listFoldersLoading: false,
  listSpeakersLoading: false,
  projectsTotal: 0,
  filesTotal: 0,
  foldersTotal: 0,
  speakersTotal: 0,
  autoCompleteFiles: [],
  autoCompleteProjects: [],
  autoCompleteFolders: [],
  autoCompleteSpeakers: [],
  autocompleteProjectsLoading: false,
  autocompleteFilesLoading: false,
  autocompleteFoldersLoading: false,
  autocompleteSpeakersLoading: false,
  autoCompleteProjectsTotal: 0,
  autoCompleteFilesTotal: 0,
  autoCompleteFoldersTotal: 0,
  autoCompleteSpeakersTotal: 0
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

    case ActionTypes.FETCH_SPEAKERS_SEARCH_LIST:
      state.listSpeakersLoading = true;
      break;
    case ActionTypes.FETCH_SPEAKERS_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.speakers = [...state.speakers, ...action.payload.data];
      state.speakersTotal = action.payload.total
      state.listSpeakersLoading = false;
      break;
    case ActionTypes.FETCH_SPEAKERS_SEARCH_LIST + ApiActionTypes.FAIL:
      state.listSpeakersLoading = false;
      break;

    case ActionTypes.RESET_SEARCH:
      state.listFilesLoading = false;
      state.listProjectsLoading = false;
      state.listFoldersLoading = false;
      state.listSpeakersLoading = false;
      state.files = [];
      state.projects = [];
      state.folders = [];
      state.speakers = [];
      state.filesTotal = 0;
      state.projectsTotal = 0;
      state.foldersTotal = 0;
      state.speakersTotal = 0;
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
      state.autocompleteFoldersLoading = false;
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_CATALOG_FOLDERS_SEARCH_LIST + ApiActionTypes.FAIL:
      state.autocompleteFoldersLoading = false
      break;

    case ActionTypes.FETCH_AUTOCOMPLETE_SPEAKERS_SEARCH_LIST:
      state.autocompleteSpeakersLoading = true
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_SPEAKERS_SEARCH_LIST + ApiActionTypes.SUCCESS:
      state.autoCompleteSpeakers =  action.payload.data.map(item => ({...item}));
      state.autocompleteSpeakersLoading = false;
      break;
    case ActionTypes.FETCH_AUTOCOMPLETE_SPEAKERS_SEARCH_LIST + ApiActionTypes.FAIL:
      state.autocompleteSpeakersLoading = false
      break;

    case CatalogActionTypes.CATALOG_ADD_TO_FAVORITE:
      state.projects = state.projects.map(i => (i.id === action.payload.id ? {...i, inFavorites: true} : i));
      state.folders = state.folders.map(i => (i.id === action.payload.id ? {...i, inFavorites: true} : i));
      state.files = state.files.map(i => (i.id === action.payload.id ? {...i, inFavorites: true} : i));
      break
    case CatalogActionTypes.CATALOG_DELETE_FROM_FAVORITE:
      state.projects = state.projects.map(i => (i.id === action.payload.id ? {...i, inFavorites: false} : i));
      state.folders = state.folders.map(i => (i.id === action.payload.id ? {...i, inFavorites: false} : i));
      state.files = state.files.map(i => (i.id === action.payload.id ? {...i, inFavorites: false} : i));
      break


    case ActionTypes.RESET_AUTOCOMPLETE_SEARCH:
      state.autocompleteFilesLoading = false;
      state.autocompleteProjectsLoading = false;
      state.autocompleteFoldersLoading = false;
      state.autocompleteSpeakersLoading = false;
      state.autoCompleteProjects = [];
      state.autoCompleteFiles = [];
      state.autoCompleteFolders = [];
      state.autoCompleteSpeakers = [];
      break;
  }

  return state
}
