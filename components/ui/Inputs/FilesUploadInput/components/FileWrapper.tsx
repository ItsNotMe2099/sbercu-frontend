import { FileUpload } from "components/FileUpload";
import FileInputPreview from "components/ui/Inputs/FilesUploadInput/components/FileInputPreview";
import React, {
  useState, useCallback, useEffect, useRef,
} from 'react'
import styles from './index.module.scss'
import Button from "../../../Button";
import {modalClose} from "../../../../Modal/actions";
export interface FileEntity {
  catalogId?: number
  key?: string
  rawFile?: File,
  preview?: string,
  path: string,
  mediaId?: number
}

interface Props {
  key: string,
  file: FileEntity,
  onUpload: (FileEntity) => void,
  onRemove: (FileEntity) => void,
  onChangeFileData: (FileEntity, data) => void
  uploadOptions: any,
  currentCatalogId: number
}

const FileWrapper = (props: Props) => {
  const {
    uploadOptions,
    onChangeFileData,
    onUpload,
    onRemove,
    currentCatalogId,
    file,
      key,
  } = props

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!file.rawFile);
  const [progress, setProgress] = useState(0);
  const fileUpload = useRef(null);
  const onFinishFileUpload = useCallback((result) => {
    onUpload({ ...file, catalogId: result.catalogId, path: result.fileKey, mediaId: result.mediaId })
    setIsLoaded(true);
  }, [props.onUpload])
  const onFileUploadError = (error) => {
    console.error('onFileUploadError', error)
    setIsLoaded(true);
  }
  const onProgress = (progress) => {
    setProgress(progress)
  }
  useEffect(() => {
    if (file.rawFile &&  !(file.rawFile as any)._uploading) {
      (file.rawFile as any)._uploading = true;
      const options = {
        ...uploadOptions,
        file: file.rawFile,
        onFinish: onFinishFileUpload,
        onProgress: onProgress,
        onError: onFileUploadError,
        catalogId: currentCatalogId
      }
      fileUpload.current = new FileUpload(options);
      if(!(window as any)._fileUploads){
        (window as any)._fileUploads = [];
      }
      (window as any)._fileUploads.push(fileUpload.current);

    }
  },[])
  const handleRemove = () => {
    if(  fileUpload.current  && file.rawFile){
      fileUpload.current.cancel();
    }
    onRemove(file)
    setConfirmRemove(false);
  }
  const handleConfirmRemove = () => {
    setConfirmRemove(true);
  }
  const handleCancelRemove = () => {
    setConfirmRemove(false);
  }


  return !confirmRemove ? <FileInputPreview
      file={file}
      loading={!isLoaded}
      progress={progress}
      onRemove={handleConfirmRemove}
      onChangeFileData={onChangeFileData}/> : <div className={styles.remove}>
    <Button white size="9px 16px" onClick={handleRemove} type="button">Удалить</Button>
    <Button transparent onClick={handleCancelRemove}  textWhite type="button">Отменить</Button>
        </div>
}


export default FileWrapper
