import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import AddFileButton from "components/ui/Inputs/FilesUploadInput/components/AddFileBtn";
import FileWrapper, { FileEntity } from "components/ui/Inputs/FilesUploadInput/components/FileWrapper";
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
  currentCatalogId?: number
}

export interface FileInputOptions extends DropzoneOptions {
  inputProps?: any
  onRemove?: Function
}

const FilesUploadInput = (props: any & FileInputProps & FileInputOptions) => {

  const {
    accept,
    children,
    className,
    currentCatalogId,
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
    input: { value, onChange },
    ...rest
  } = props
  const token = Cookies.get('token')
  const FileWrapperUploadOptions = {
    headers: { 'x-amz-acl': 'public-read',  'Authorization': `Bearer ${token}`},
    ...uploadOptions,
  }

  const [files, setFiles] = useState<FileEntity[]>(formatValue(value))
  useEffect(() => {
    const filtered = files.filter((file => !!file.path))
    if(multiple) {
        onChange(filtered.map(item => { console.log("Item", item); return {path: item.path, catalogId: item.catalogId, mediaId: item.mediaId, key: item.key, ...(item as any).data}}))

    }else{
      onChange(filtered[0]?.path || null)
    }
  }, [files])
  const generateKey = () => {
    return nextId("file-");
  }
  const onUpload = (file: FileEntity) => {
    console.log("onUploadFiles", file)

    setFiles(oldFiles => oldFiles.map(item => {
      return {
        ...item,
        ...(item.rawFile?.name === file.rawFile.name ? {catalogId: file.catalogId, path: file.path, mediaId: file.mediaId} : {})
      }
    }))
  }
  const onChangeFileData = (file: FileEntity, data) => {
    console.log("onChangeFileData", file.path, data)
    setFiles(oldFiles => oldFiles.map(item => {
      console.log("Map Exists",  (file.path && item.path === file.path) || (!file.path && item.rawFile?.name === file.rawFile.name) )
      return {
        ...item,
        ...( ( (file.path && item.path === file.path) || (!file.path && item.rawFile?.name === file.rawFile.name)) ? {data} : {})
      }
    }))
  }
  const onDrop = useCallback((newFiles, rejectedFiles, event) => {
    const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles]
    setFiles(updatedFiles.map(transformFile));
  }, [files])

  const onRemove = useCallback((file: FileEntity) => {
    setFiles(files => {
      const index = files.findIndex( item => shallowEqual(item.rawFile, file.rawFile) || item.path === file.path)
      const newFiles = [...files];
      newFiles.splice(index, 1);
      return newFiles
    });
  },[files])

  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    accept,
    maxSize,
    minSize,
    multiple,
    onDrop,
  })

  return (
    <div className={styles.root}>
      {files.length > 0 && <div className={styles.previewList}>
        {files.map((file, index) => (
          <FileWrapper
            key={file.key}
            currentCatalogId={currentCatalogId}
            uploadOptions={FileWrapperUploadOptions}
            file={file}
            onUpload={onUpload}
            onChangeFileData={onChangeFileData}
            onRemove={onRemove}
         />
        ))}
      </div>}
      {files.length === 0 && <div
        data-testid="dropzone"
        className={styles.dropZone}
        {...getRootProps()}
      >
      <div className={styles.emptyFiles}>
            <img src="/img/icons/attach_file.svg" alt=''/>
            <span>Перенесите сюда файл или нажмите<br/> для выбора файла на компьютере</span>
        </div>
        <input
          {...getInputProps()}
        />

      </div>}
      <ErrorInput {...props}/>
      {files.length > 0 && <div className={styles.footer}>
        {props.buttonSubmit}
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

FilesUploadInput.propTypes = {
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

export default FilesUploadInput
