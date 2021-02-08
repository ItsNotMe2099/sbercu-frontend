import {
    createCatalog,
    createCatalogRequest,
    createFile,
    createFileRequest,
    createFiles, cutVideo, cutVideoRequest,
    deleteCatalog,
    deleteCatalogRequest,
    fetchCatalogItem,
    fetchCatalogList, fetchMyUploadedFiles, resetCatalogList,
    updateCatalog,
    updateCatalogRequest,
    updateFile,
    updateFileRequest
} from "components/catalog/actions";
import { modalClose } from "components/Modal/actions";
import ApiActionTypes from "constants/api";
import { router } from "next/client";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'

import Router from "next/router";

function* catalogSaga() {

    yield takeLatest(ActionTypes.CREATE_CATALOG,
        function* (action: ActionType<typeof createCatalog>) {
            yield put(createCatalogRequest(action.payload.data));
            const result = yield take([ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.FAIL])
            if (result.type === ActionTypes.CREATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS) {
                console.log("CREATE TAG_CATEGORY SUCCESS")
                if (action.payload.data.entryType === 'project') {
                    Router.push(`/catalog/${result.payload.id}`)
                } else {
                    const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
                    yield put(resetCatalogList(true));
                    yield put(fetchCatalogList(currentCatalogId, 1, 15));
                }
                yield put(modalClose());
            }
        })
    yield takeLatest(ActionTypes.UPDATE_CATALOG,
        function* (action: ActionType<typeof updateCatalog>) {
            yield put(updateCatalogRequest(action.payload.id, action.payload.data));
            const result = yield take([ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_CATALOG_REQUEST + ApiActionTypes.FAIL])
            if (result.type === ActionTypes.UPDATE_CATALOG_REQUEST + ApiActionTypes.SUCCESS) {
                console.log("UPDATE TAG_CATEGORY SUCCESS")
                if (action.payload.data.entryType === 'project') {
                    Router.push(`/catalog/${result.payload.id}`)
                } else {
                    yield put(modalClose());
                    const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
                    if (action.payload.id === currentCatalogId) {
                        yield put(fetchCatalogItem(currentCatalogId));
                    } else {
                        yield put(resetCatalogList(true));
                        const myUploadedFilesListTotal = yield select((state: IRootState) => state.catalog.myUploadedFilesListTotal)
                        if(myUploadedFilesListTotal > 0){
                        //    yield put(fetchMyUploadedFiles(currentCatalogId, {limit: 30}));
                        }
                        yield put(fetchCatalogList(currentCatalogId, 1, 15));
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
                if (currentCatalogItem.id === action.payload.id && currentCatalogItem.entryType === 'file') {
                    Router.push(`/catalog/${currentCatalogItem.parentId}`);
                    return;
                } else if (currentCatalogItem.id === action.payload.id && currentCatalogItem.entryType === 'project') {
                    Router.replace(`/`);
                } else {
                    const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)
                    yield put(resetCatalogList(true));
                    yield put(fetchCatalogList(currentCatalogId, 1, 15));
                }

            }
        })

    yield takeLatest(ActionTypes.CREATE_FILES,
        function* (action: ActionType<typeof createFiles>) {
            const currentCatalogId = yield select((state: IRootState) => state.catalog.currentCatalogId)

            for (const file of action.payload.files) {
                console.log("Create File", file)
                yield put(createFileRequest({
                    ...file,
                    entryType: 'file',
                    parentId: currentCatalogId,
                    presenters: file.presenters
                }));
                const result = yield take([ActionTypes.CREATE_FILE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FILE_REQUEST + ApiActionTypes.FAIL])
            }
            yield put(fetchCatalogList(currentCatalogId));
            yield put(modalClose());
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
                        yield put(fetchCatalogItem(action.payload.id, { ...(action.payload.data.entryType === 'file' ? { showTags: true } : {}) }))
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

}

export default catalogSaga
