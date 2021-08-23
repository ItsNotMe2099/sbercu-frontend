import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const createFolderOpen = () => action(ActionTypes.CREATE_FOLDER)
export const editFileOpen = () => action(ActionTypes.EDIT_FILE)
export const tagModalOpen = () => action(ActionTypes.TAG)
export const tagCategoryModalOpen = () => action(ActionTypes.TAG_CATEGORY)
export const userModalOpen = () => action(ActionTypes.USER_MODAL)
export const confirmOpen = (data: any) => action(ActionTypes.CONFIRM_MODAL_OPEN, data)
export const confirmChangeData = (data: any) => action(ActionTypes.CHANGE_CONFIRM_DATA, data)
export const uploadFilesModalOpen = () => action(ActionTypes.UPLOAD_FILES)
export const videoEditorConfirmOpen = () => action(ActionTypes.VIDEO_EDITOR_CONFIRM)
export const videoCodeModalOpen = () => action(ActionTypes.VIDEO_CODE_MODAL)
export const filePosterUploadModalOpen = () => action(ActionTypes.FILE_POSTER_UPLOAD_MODAL)
export const mediaLinkTempModalOpen = () => action(ActionTypes.MEDIA_LINK_TEMP_MODAL)
export const mediaLinkPublicModalOpen = () => action(ActionTypes.MEDIA_LINK_PUBLIC_MODAL)
export const mediaLinkVirtSchoolModalOpen = () => action(ActionTypes.MEDIA_LINK_VIRTSCHOOL_MODAL)
export const pasteCatalogItemDuplicateOpen = () => action(ActionTypes.PASTE_CATALOG_ITEM_DUPLICATE)
export const modalClose = () => action(ActionTypes.MODAL_CLOSE)
