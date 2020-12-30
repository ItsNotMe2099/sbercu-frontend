import ApiActionTypes from "constants/api";
import { ICatalogEntry, ITagCategory } from "types";
import ActionTypes from "./const";

export interface CatalogSearchList {
  files: ICatalogEntry[],
  filesTotal?: number,
  projects: ICatalogEntry[],
  projectsTotal?: number,
  listLoading: boolean,
}

const initialState: CatalogSearchList = {
  files: [],
  projects: [],
  listLoading: false,
  projectsTotal: 0,
  filesTotal: 0,

}

export default function CatalogSearchReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_CATALOG_SEARCH_LIST:
      state.listLoading = true;
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
  }

  return state
}
