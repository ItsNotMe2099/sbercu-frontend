
import { FileUpload } from "components/FileUpload";
import FileInputPreview from "components/ui/Inputs/FilesUploadInput/components/FileInputPreview";
import React, { useState, useCallback, useEffect,
} from 'react'

import S3Upload from 'components/ui/AvatarInput/S3Upload.js'
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

  const [isLoaded, setIsLoaded] = useState(!file.rawFile);
  const [progress, setProgress] = useState(0);
  const onFinishFileUpload = useCallback((result) => {
    onUpload({ ...file, catalogId: result.catalogId, path: result.fileKey, mediaId: result.mediaId })
    setIsLoaded(true);
  }, [props.onUpload])
  const onFileUploadError = (error) => {
    console.error('onFileUploadError', error)
    setIsLoaded(true);
  }
  const onProgress = (progress) => {
    console.log("onProgress", progress)
    setProgress(progress)
  }
  useEffect(() => {
    if (file.rawFile &&  !(file.rawFile as any)._uploading) {
      console.log("Upload", currentCatalogId);
      (file.rawFile as any)._uploading = true;
      const options = {
        ...uploadOptions,
        file: file.rawFile,
        onFinish: onFinishFileUpload,
        onProgress: onProgress,
        onError: onFileUploadError,
        catalogId: currentCatalogId
      }
        new FileUpload(options)

    }
  },[])
  return (
    <FileInputPreview
      file={file}
      loading={!isLoaded}
      progress={progress}
      onRemove={() => onRemove(file)}
      onChangeFileData={onChangeFileData}
    >
    </FileInputPreview>
  )
}


export default FileWrapper
