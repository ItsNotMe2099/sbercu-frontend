import {  modalClose } from "components/Modal/actions";
import {
  createTagCategory,
  createTagCategoryRequest, deleteTagCategory, deleteTagCategoryRequest,
  fetchTagCategoryList,
  updateTagCategory,
  updateTagCategoryRequest
} from "components/tags/TagCategory/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* tagCategorySaga() {

  yield takeLatest(ActionTypes.CREATE_TAG_CATEGORY,
    function* (action: ActionType<typeof createTagCategory>) {
      yield put(createTagCategoryRequest( action.payload.data));
      const result = yield take([ActionTypes.CREATE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_TAG_CATEGORY_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose());
        const categoryType = yield select((state: IRootState) => state.tagCategory.categoryType)
        yield put(fetchTagCategoryList(categoryType));
      }
    })
  yield takeLatest(ActionTypes.UPDATE_TAG_CATEGORY,
    function* (action: ActionType<typeof updateTagCategory>) {
      yield put(updateTagCategoryRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_TAG_CATEGORY_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose());
        const categoryType = yield select((state: IRootState) => state.tagCategory.categoryType)
        yield put(fetchTagCategoryList(categoryType));
      }
    })
  yield takeLatest(ActionTypes.DELETE_TAG_CATEGORY,
    function* (action: ActionType<typeof deleteTagCategory>) {
     // yield put(confirmChangeData({loading: true}));
      yield put(deleteTagCategoryRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_TAG_CATEGORY_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_TAG_CATEGORY_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose());
        const profile = yield select((state: IRootState) => state.tagCategory.currentCategory)
        const categoryType = yield select((state: IRootState) => state.tagCategory.categoryType)
        yield put(fetchTagCategoryList(categoryType));
      }
    })

}

export default tagCategorySaga
