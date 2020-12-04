import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import AddFileButton from "components/ui/Inputs/S3FileUpload/components/AddFileBtn";
import FileInputPreview from "components/ui/Inputs/S3FileUpload/components/FileInputPreview";
import React, {
  FunctionComponent,
  Children,
  cloneElement,
  isValidElement,
  ReactElement, useState, useCallback, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { shallowEqual } from 'recompose'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import S3Upload from 'react-s3-uploader/s3upload'
import styles from './index.module.scss'

import Cookies from 'js-cookie'

export interface FileEntity {
  rawFile?: File,
  preview?: string,
  path: string
}

interface Props {
  file: FileEntity,
  onUpload: (FileEntity) => void,
  onRemove: (FileEntity) => void,
  uploadOptions: any,
}

const FileWrapper = (props: Props) => {
  const {
    uploadOptions,
    onUpload,
    onRemove,
    file,
  } = props

  const [isLoaded, setIsLoaded] = useState(!file.rawFile);
  const [progress, setProgress] = useState(0);
  const onFinishFileUpload = useCallback((result) => {
    onUpload({ ...file, path: result.fileKey })
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
    >
    </FileInputPreview>
  )
}


export default FileWrapper
