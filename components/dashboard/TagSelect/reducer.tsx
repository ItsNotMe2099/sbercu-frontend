import ActionTypes from "./const";

export interface CategoryTagState {
  categories: string[],
  tags: string[]
}

const initialState: CategoryTagState = {
categories: [],
tags: []
}

export default function authReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_TAG:
      console.log("action.payload", action.payload)
      state.categories = action.payload.map(item => {
        return  {
          value: item.id,
          label: item.name
        }
      });
      state.tags = action.payload.tags.map(item => {
        return  {
          value: item.id,
          label: item.name
        }
      });
  }
  return state
}
