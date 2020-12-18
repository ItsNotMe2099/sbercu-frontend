
import FileInputPreview from "components/ui/Inputs/FilesUploadInput/components/FileInputPreview";
import React, { useState, useCallback, useEffect,
} from 'react'

import S3Upload from 'components/ui/AvatarInput/S3Upload.js'
export interface FileEntity {
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
}

const FileWrapper = (props: Props) => {
  const {
    uploadOptions,
    onChangeFileData,
    onUpload,
    onRemove,
    file,
      key,
  } = props

  const [isLoaded, setIsLoaded] = useState(!file.rawFile);
  const [progress, setProgress] = useState(0);
  const onFinishFileUpload = useCallback((result) => {
    onUpload({ ...file, path: result.fileKey, mediaId: result.mediaId })
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
      console.log("Upload");
      (file.rawFile as any)._uploading = true;
      const options = {
        ...uploadOptions,
        files: [file.rawFile],
        onFinishS3Put: onFinishFileUpload,
        onProgress: onProgress,
        onError: onFileUploadError,
      }
        new S3Upload(options)

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
