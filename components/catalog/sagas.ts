import {
    createCatalog,
    createCatalogRequest, deleteCatalog, deleteCatalogRequest, fetchCatalogItem,
    fetchCatalogList, updateCatalog,
    updateCatalogRequest
} from "components/catalog/actions";
import {  modalClose } from "components/Modal/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'

import Router from "next/router";
function* catalogSaga() {

  yield takeLatest(ActionTypes.CREATE_CATALOG,
    function* (action: ActionType<typeof createCatalog>) {
      yield put(createCatalogRequest( action.payload.data));
      const result = yield take([ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS){
        console.log("CREATE TAG_CATEGORY SUCCESS")
        yield put(modalClose());
        const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
        yield put(fetchCatalogList(currentCatalogId));
      }
    })
  yield takeLatest(ActionTypes.UPDATE_CATALOG,
    function* (action: ActionType<typeof updateCatalog>) {
      yield put(updateCatalogRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS){
        console.log("UPDATE TAG_CATEGORY SUCCESS")
          if( action.payload.data.entryType === 'project'){
              Router.push(`catalog/${result.payload.id}`)
          }else {
              yield put(modalClose());
              const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
              if(action.payload.id === currentCatalogId){
                  yield put(fetchCatalogItem(currentCatalogId));
              }else {
                  yield put(fetchCatalogList(currentCatalogId));
              }
          }
      }
    })
  yield takeLatest(ActionTypes.DELETE_CATALOG,
    function* (action: ActionType<typeof deleteCatalog>) {
     // yield put(confirmChangeData({loading: true}));
      yield put(deleteCatalogRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE TAG_CATEGORY SUCCESS")
        yield put(modalClose());
          const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
          yield put(fetchCatalogList(currentCatalogId));
      }
    })

}

export default catalogSaga
