import {  modalClose } from "components/Modal/actions";
import {
  createTag,
  createTagRequest, deleteTag, deleteTagRequest,
  fetchTagList,
  updateTag,
  updateTagRequest
} from "components/tags/Tag/actions";
import { fetchTagCategoryList } from "components/tags/TagCategory/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* tagSaga() {

  yield takeLatest(ActionTypes.CREATE_TAG,
    function* (action: ActionType<typeof createTag>) {
      yield put(createTagRequest( action.payload.data));
      const result = yield take([ActionTypes.CREATE_TAG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_TAG_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_TAG_REQUEST + ApiActionTypes.SUCCESS){
        console.log("CREATE TAG SUCCESS")
        yield put(modalClose());
        const profile = yield select((state: IRootState) => state.tagCategory.currentCategory)
        yield put(fetchTagCategoryList());
      }
    })
  yield takeLatest(ActionTypes.UPDATE_TAG,
    function* (action: ActionType<typeof updateTag>) {
      yield put(updateTagRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_TAG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_TAG_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_TAG_REQUEST + ApiActionTypes.SUCCESS){
        console.log("UPDATE TAG SUCCESS")
        yield put(modalClose());
          yield put(fetchTagCategoryList());
      }
    })
  yield takeLatest(ActionTypes.DELETE_TAG,
    function* (action: ActionType<typeof deleteTag>) {
     // yield put(confirmChangeData({loading: true}));
      yield put(deleteTagRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_TAG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_TAG_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_TAG_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE TAG SUCCESS")
        yield put(modalClose());
          yield put(fetchTagCategoryList());
      }
    })

}

export default tagSaga
