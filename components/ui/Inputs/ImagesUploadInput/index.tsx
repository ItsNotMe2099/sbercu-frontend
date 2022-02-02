import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import AddFileButton from "components/ui/Inputs/FilesUploadInput/components/AddFileBtn";
import ImageWrapper, { FileEntity } from "components/ui/Inputs/ImagesUploadInput/components/ImageWrapper";
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
import styles from './index.module.scss'
import Cookies from 'js-cookie'
import nextId from "react-id-generator";
import { useDispatch} from 'react-redux'
import {deleteCatalog, deleteCatalogRequest, resetFilesFromDropzone} from "../../../catalog/actions";
import FormError from 'components/ui/Form/FormError'
const transformFile = file => {
  if (!(file instanceof File)) {
    return file
  }
  const preview = URL.createObjectURL(file)
  const transformedFile = {
    key:  nextId('file'),
    rawFile: file,
    preview: preview,
  }
  console.log("transformedFile", transformedFile)
  return transformedFile
}
const formatValue = (value): FileEntity[]  => {
  console.log("FormatValue", value)
  return value ? (Array.isArray(value) ? value.map((file) => { return {path: file?.path as string || file as string}}) : [{path: value?.path as string || value as string}]) : []
}


export interface FileInputProps {
  accept?: string
  labelMultiple?: string
  labelSingle?: string
  maxSize?: number
  minSize?: number
  multiple?: boolean,
  addFileButton?: ReactElement
}

export interface FileInputOptions extends DropzoneOptions {
  inputProps?: any
  onRemove?: Function,
  filesFromDropZone: File[],
  onSyncFiles?: (files) => void
}

const ImagesUploadInput = (props: any & FileInputProps & FileInputOptions) => {

  const {
    accept,
    children,
    className,
    classes: classesOverride,
    format,
    helperText,
    label,
    labelMultiple = 'ra.input.file.upload_several',
    labelSingle = 'ra.input.file.upload_single',
    maxSize,
    minSize,
    multiple = false,
    uploadOptions,
    options: {
      inputProps: inputPropsOptions,
      ...options
    } = {} as FileInputOptions,
    parse,
    placeholder,
    resource,
    source,
    validate,
    onSyncFiles,
    input: { value, onChange },
    ...rest
  } = props
  const dispatch = useDispatch()
  const token = Cookies.get('token')
  const [error, setError] = useState(null);
  const FileWrapperUploadOptions = {
    headers: { 'x-amz-acl': 'public-read',  'Authorization': `Bearer ${token}`},
    ...uploadOptions,
  }

  const [files, setFiles] = useState<FileEntity[]>(formatValue(value))

  useEffect(() => {
    const filtered = files.filter((file => !!file.path))
    if(multiple) {
        onChange(filtered.map(item => { console.log("Item", item); return item.path}))

    }else{
      onChange(filtered[0]?.path || null)
    }
    if(onSyncFiles){
      onSyncFiles(files);
    }

  }, [files])
  useEffect(() => {
    if(props.filesFromDropZone && props.filesFromDropZone.length > 0){
      onDrop(props.filesFromDropZone);
      dispatch(resetFilesFromDropzone());
    }
  }, [props.filesFromDropZone])
  const generateKey = () => {
    return nextId("file-");
  }
  const onUpload = (file: FileEntity) => {
    console.log("onUploadFiles", file)

    setFiles(oldFiles => oldFiles.map(item => {
      return {
        ...item,
        ...(item.rawFile?.name === file.rawFile.name ? {path: file.path, mediaId: file.mediaId} : {})
      }
    }))
  }

  const onDrop = useCallback((newFiles) => {
    const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles]
    setFiles(updatedFiles.map(transformFile));

    setError(null);
  }, [files])
  const onFileUploadError = (error) => {
    console.error('onFileUploadError', error)
    setError(error);
  }
  const onRemove =(file: FileEntity) => {
    setFiles(files => {
      const index = files.findIndex( item => (file.key && file.key === item.key) || (!file.key && item.path === file.path))
      const newFiles = [...files];
      newFiles.splice(index, 1);
      return newFiles
    });

    console.log("FileRemove", file);
  }
  const onDropRejected = (error) => {
    if(error.length > 0 && error[0].errors.length > 0){
      setError(error[0].errors[0].message);
    }

  }
  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    accept,
    maxSize,
    minSize,
    multiple,
    onDrop,
    onDropRejected
  })

  return (
    <div className={styles.root}>
      {files.length > 0 && <div className={styles.previewList}>
        {files.map((file, index) => (
          <ImageWrapper
            key={file.key}
            uploadOptions={FileWrapperUploadOptions}
            file={file}
            onUpload={onUpload}
            onRemove={onRemove}
         />
        ))}
      </div>}
      <ErrorInput {...props?.meta}/>
      {(error || props.error) && <FormError error={error || props.error}/>}

      {files.length === 0 && <div
        data-testid="dropzone"
        className={styles.dropZone}
        {...getRootProps()}
      >
      <div className={styles.emptyFiles}>
            <img src="/img/icons/attach_file.svg" alt=''/>
            <span>Перенесите сюда файл <br/>или нажмите для выбора <br/>файла на компьютере</span>
        </div>
        <input
          {...getInputProps()}
        />

      </div>}

      {files.length > 0  && <div className={styles.footer}>
          <div
              data-testid="dropzone"
              className={styles.uploadDropZone}
              {...getRootProps()}
          >
          <img src="/img/icons/upload_file.svg" alt=''/>
          <span>Вы можете добавить<br/>сюда еще один файл</span>
            <input
                {...getInputProps()}
            />
          </div>
      </div>}
    </div>
  )
}

ImagesUploadInput.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.element,
  classes: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  labelMultiple: PropTypes.string,
  labelSingle: PropTypes.string,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  multiple: PropTypes.bool,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  placeholder: PropTypes.node,
}
ImagesUploadInput.defaultProps = {
  maxSize: 10485760,
  accept: ["image/jpeg", "image/png"]
}

export default ImagesUploadInput
