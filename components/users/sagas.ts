import {
    createUser,
    createUserRequest, deleteUser, deleteUserRequest, fetchOneUserRequest,
    fetchUserList, resetUserList, updateUser,
    updateUserRequest
} from "components/users/actions";
import {  modalClose } from "components/Modal/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* userSaga() {

  yield takeLatest(ActionTypes.CREATE_USER,
    function* (action: ActionType<typeof createUser>) {
      yield put(createUserRequest( action.payload.data));
      const result = yield take([ActionTypes.CREATE_USER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_USER_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_USER_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose());
        yield put(resetUserList());
        yield put(fetchUserList());
      }
    })
  yield takeLatest(ActionTypes.UPDATE_USER,
    function* (action: ActionType<typeof updateUser>) {
      yield put(updateUserRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_USER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_USER_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_USER_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose());
        yield put(fetchOneUserRequest(action.payload.id));
      }
    })
  yield takeLatest(ActionTypes.DELETE_USER,
    function* (action: ActionType<typeof deleteUser>) {
      yield put(deleteUserRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_USER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_USER_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_USER_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose());
          yield put(resetUserList());
          yield put(fetchUserList());
      }
    })

}

export default userSaga
