import {
  catalogAddToFavorite,
  catalogAddToFavoriteRequest,
  catalogCopy, catalogPaste, catalogRemoveFromFavorite, catalogRemoveFromFavoriteRequest,
  createCatalog,
  createCatalogRequest,
  createFile,
  createFileRequest,
  createFiles, cutVideo, cutVideoRequest,
  deleteCatalog,
  deleteCatalogRequest, deleteManyCatalog, deleteManyCatalogRequest,
  fetchCatalogItemRequest,
  fetchCatalogList, moveCatalogRequest, resetCatalogList, resetFilesFromDropzone,
  updateCatalog, updateCatalogFileRequest,
  updateCatalogRequest,
  updateFile,
  updateFileRequest
} from "components/catalog/actions";
import {modalClose, pasteCatalogItemDuplicateOpen} from "components/Modal/actions";
import ApiActionTypes from "constants/api";
import {router} from "next/client";
import {takeLatest, put, take, select} from 'redux-saga/effects'
import {IRequestData, IResponse, IRootState} from "types";
import {ActionType} from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import {toast} from "react-toastify";
import Router from "next/router";
import {pluralize} from 'utils/formatters'

function* catalogSaga() {

  yield takeLatest(ActionTypes.CREATE_CATALOG,
    function* (action: ActionType<typeof createCatalog>) {
      yield put(createCatalogRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("CREATE TAG_CATEGORY SUCCESS")
        if (action.payload.data.entryType === 'project') {
          Router.push(`/catalog/${result.payload.id}`)
        } else {
          const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
          yield put(resetCatalogList(true));
          yield put(fetchCatalogList(currentCatalogId, 1, 30));
        }
        yield put(modalClose());
      }
    })
  yield takeLatest(ActionTypes.UPDATE_CATALOG,
    function* (action: ActionType<typeof updateCatalog>) {
      yield put(updateCatalogRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_CATALOG + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("UPDATE TAG_CATEGORY SUCCESS")
        if (action.payload.data.entryType === 'project') {
          Router.push(`/catalog/${result.payload.id}`)
        } else {
          yield put(modalClose());
          const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
          if (action.payload.id === currentCatalogId) {
            yield put(fetchCatalogItemRequest(currentCatalogId));
          } else {
            yield put(resetCatalogList(true));
            const myUploadedFilesListTotal = yield select((state: IRootState) => state.catalog.myUploadedFilesListTotal)
            if (myUploadedFilesListTotal > 0) {
              //    yield put(fetchMyUploadedFiles(currentCatalogId, {limit: 30}));
            }
            yield put(fetchCatalogList(currentCatalogId, 1, 30));
          }
        }
      }
    })
  yield takeLatest(ActionTypes.DELETE_CATALOG,
    function* (action: ActionType<typeof deleteCatalog>) {
      // yield put(confirmChangeData({loading: true}));
      yield put(deleteCatalogRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("DELETE TAG_CATEGORY SUCCESS")
        yield put(modalClose());

        const currentCatalogItem = yield select((state: IRootState) => state.catalog.currentCatalogItem)
        toast.success('Обьект успешно удален');
        if (currentCatalogItem.id === action.payload.id && currentCatalogItem.entryType === 'file') {
          Router.push(`/catalog/${currentCatalogItem.parentId}`);
          return;
        } else if (currentCatalogItem.id === action.payload.id && currentCatalogItem.entryType === 'folder') {
          Router.push(`/catalog/${currentCatalogItem.parentId}`);
          return;
        } else if (currentCatalogItem.id === action.payload.id && currentCatalogItem.entryType === 'project') {
          Router.replace(`/`);
        } else {
          const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
          yield put(resetCatalogList(true));
          yield put(fetchCatalogList(currentCatalogId, 1, 30));
        }

      }
    })

  yield takeLatest(ActionTypes.DELETE_MANY_CATALOG,
    function* (action: ActionType<typeof deleteManyCatalog>) {
      // yield put(confirmChangeData({loading: true}));
      yield put(deleteManyCatalogRequest(action.payload.entries));
      const result = yield take([ActionTypes.DELETE_MANY_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_MANY_CATALOG_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_MANY_CATALOG_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("DELETE TAG_CATEGORY SUCCESS")
        const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
        yield put(resetCatalogList(true));
        yield put(fetchCatalogList(currentCatalogId, 1, 30));
        toast.success('Обьекты успешно удалены');
      }
    })

  yield takeLatest(ActionTypes.CREATE_FILES,
    function* (action: ActionType<typeof createFiles>) {
      const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)

      for (const file of action.payload.files) {
        console.log("updateCatalogFileRequest", file)
        yield put(updateCatalogFileRequest((file as any).catalogId, {
          name: file.name,
          presenters: file.presenters
        }));
        const result = yield take([ActionTypes.UPDATE_CATALOG_FILE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_CATALOG_FILE_REQUEST + ApiActionTypes.FAIL])
      }
      yield put(resetCatalogList(true));
      yield put(fetchCatalogList(currentCatalogId, 1, 30));
      yield put(modalClose());
      yield put(resetFilesFromDropzone());
    })
  yield takeLatest(ActionTypes.CREATE_FILE,
    function* (action: ActionType<typeof createFile>) {
      yield put(createFileRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_FILE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FILE_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_FILE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("CREATE FILE SUCCESS")
        yield put(modalClose());
        const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
        yield put(fetchCatalogList(currentCatalogId));
      }
    })
  yield takeLatest(ActionTypes.UPDATE_FILE,
    function* (action: ActionType<typeof updateFile>) {
      yield put(updateFileRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_FILE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_FILE_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_FILE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("UPDATE FILE SUCCESS")
        if (action.payload.data.entryType === 'project') {
          Router.push(`/catalog/${result.payload.id}`)
        } else {
          yield put(modalClose());
          const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
          const currentCatalogItem = yield select((state: IRootState) => state.catalog.currentCatalogItem)
          console.log("currentCatalogId", currentCatalogId, action.payload.id)
          if (currentCatalogItem?.id === action.payload.id) {
            yield put(fetchCatalogItemRequest(action.payload.id, {...(action.payload.data.entryType === 'file' ? {showTags: true} : {})}))
          } else {
            yield put(resetCatalogList(true));
            yield put(fetchCatalogList(currentCatalogId, 1, 15));
          }
        }
      }
    })

  yield takeLatest(ActionTypes.CUT_VIDEO,
    function* (action: ActionType<typeof cutVideo>) {
      yield put(cutVideoRequest(action.payload.id, action.payload.intervals.map((item) => ({
        start: item.start,
        end: item.end
      }))));
      const result = yield take([ActionTypes.CUT_VIDEO_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CUT_VIDEO_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CUT_VIDEO_REQUEST + ApiActionTypes.SUCCESS) {
        const currentCatalogItem = yield select((state: IRootState) => state.catalog.currentCatalogItem)
        Router.push(`/video/${currentCatalogItem.id}`)
      }
    })
  yield takeLatest(ActionTypes.CATALOG_COPY,
    function* (action: ActionType<typeof catalogCopy>) {
      const items = Array.isArray(action.payload) ? action.payload : [action.payload];
      localStorage.setItem('copyCatalog', JSON.stringify(items));
      if (items.length === 1) {
        toast.success(`${items[0].entryType === 'file' ? `Файл скопирован` : `Папка скопирована`} в буфер обмена`);
      } else {
        const folders = items.filter(i => i.entryType === 'folder');
        const files = items.filter(i => i.entryType === 'file');
        return `${folders.length > 0 ? `${folders.length} ${pluralize(folders.length, 'папка', 'папки', 'папок')}` : ''} 
          ${files.length > 0 ? `${files.length} ${pluralize(files.length, 'файл', 'файла', 'файлов')}` : ''} скопированы в буфер обмена`;

      }
    })

  yield takeLatest(ActionTypes.CATALOG_PASTE,
    function* (action: ActionType<typeof catalogPaste>) {
      try {
        const items = JSON.parse(localStorage.getItem('copyCatalog'));
        const entries = items.map(i => i.id);
        const parentId = action.payload.toCatalogId;
        yield put(moveCatalogRequest(entries, parentId));
        const result = yield take([ActionTypes.MOVE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.MOVE_CATALOG_REQUEST + ApiActionTypes.FAIL])
        if (result.type === ActionTypes.MOVE_CATALOG_REQUEST + ApiActionTypes.SUCCESS) {
          yield put(modalClose());
          const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
          if (parentId === currentCatalogId) {
            yield put(fetchCatalogItemRequest(currentCatalogId));
            yield put(resetCatalogList(true));
            yield put(fetchCatalogList(currentCatalogId, 1, 30));
          }
          localStorage.removeItem('copyCatalog');
        } else if (result.type === ActionTypes.MOVE_CATALOG_REQUEST + ApiActionTypes.FAIL) {
          console.log("ErrorPaster");
          yield put(pasteCatalogItemDuplicateOpen())

        }

      } catch (e) {

      }

    })

  yield takeLatest(ActionTypes.CATALOG_ADD_TO_FAVORITE,
    function* (action: ActionType<typeof catalogAddToFavorite>) {
      yield put(catalogAddToFavoriteRequest(action.payload.id));
    })
  yield takeLatest(ActionTypes.CATALOG_DELETE_FROM_FAVORITE,
    function* (action: ActionType<typeof catalogRemoveFromFavorite>) {
      yield put(catalogRemoveFromFavoriteRequest(action.payload.id));
    })
}

export default catalogSaga
