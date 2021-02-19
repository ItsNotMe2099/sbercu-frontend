import ApiActionTypes from "constants/api";
import {IJob, IUser} from "types";
import ActionTypes from "./const";

export interface JobState {
  list: IJob[],
  page: number,
  listTotal?: number,
  listLoading: boolean,
  updateIds: number[]
}

const initialState: JobState = {
  page: 1,
  list: [],
  listLoading: false,
  updateIds: []
}

export default function JobReducer(state = {...initialState}, action) {
  switch(action.type) {


    case ActionTypes.SET_JOB_PAGE:
      state.page = action.payload
      break;
    case ActionTypes.CANCEL_JOB + ApiActionTypes.SUCCESS:


    case ActionTypes.FETCH_ONE_JOB + ApiActionTypes.SUCCESS:
      console.log(" action.payload",  action.payload);
      state.list = state.list.map(user => user.id === action.payload.id ? action.payload : user);
      break

    case ActionTypes.FETCH_JOB_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_JOB_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list , ...action.payload.data]
      state.listTotal = action.payload.total
      state.listLoading = false;
      state.updateIds = state.list.filter(job => ['pending', 'started'].includes(job.state)).map(job => job.id)
      break
    case ActionTypes.FETCH_JOB_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break
    case ActionTypes.FETCH_JOB_LIST_BY_IDS + ApiActionTypes.SUCCESS:
      for(let job of action.payload){
        state.list = state.list.map(item => item.id === job.id ? job : item)
      }
      state.updateIds = state.list.filter(job => ['pending', 'started'].includes(job.state)).map(job => job.id)


      break;

    case ActionTypes.RESET_JOB_LIST:
      state.page = 1;
      state.list = [];
      state.listTotal = 0;
      break;
  }

  return state
}
