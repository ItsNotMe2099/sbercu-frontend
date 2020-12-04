import AvatarAddFileBtn from "components/ui/AvatarInput/components/AvatarAddFileBtn";
import AvatarInputPreview from "components/ui/AvatarInput/components/AvatarInputPreview";
import ErrorInput from "components/ui/Inputs/Input/components/ErrorInput";
import AddFileButton from "components/ui/Inputs/S3FileUpload/components/AddFileBtn";
import React, {
    FunctionComponent,
    Children,
    cloneElement,
    isValidElement,
    ReactElement, useState, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import { shallowEqual } from 'recompose'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import S3Upload from 'react-s3-uploader/s3upload'
import styles from './index.module.scss'

import Cookies from 'js-cookie'


export interface AvatarInputProps {
  accept?: string
  labelMultiple?: string
  labelSingle?: string
  maxSize?: number
  minSize?: number
  multiple?: boolean,
  handleChangePhoto?: (string) => {}
  handleDeletePhoto?: () => {}
}

export interface AvatarInputOptions extends DropzoneOptions {
  inputProps?: any
  onRemove?: Function
}
const AvatarInput = (props: any & AvatarInputProps & AvatarInputOptions) => {
      const {
        accept,
        children,
        className,
        classes: classesOverride,
        format,
        helperText,
        handleChange,
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
        } = {} as AvatarInputOptions,
        parse,
        placeholder,
        resource,
        source,
        validate,
        input: {value, onChange},
        ...rest
    } = props


  const handleChangePhoto = () => {
    if(props.handleChangePhoto){
      props.handleChangePhoto(value);
    }
  }
  const handleDeletePhoto = useCallback(() => {
        onChange(null)
    if(props.handleDeletePhoto){
      props.handleDeletePhoto();
    }

  }, [value, onChange])

    // turn a browser dropped file structure into expected structure
      const transformFile = file => {
        if (!(file instanceof File)) {
          return file
        }


        const preview = URL.createObjectURL(file)
        const transformedFile = {
          rawFile: file,
          preview: preview,
        }

        console.log('transformedFile', transformedFile)


        return transformedFile
      }

      const transformFiles = (files: any[]) => {
        console.log("TransformFile", files)
        if (!files) {
          return multiple ? [] : null
        }

        if (Array.isArray(files)) {
          return files.map(transformFile);
        }

        return transformFile(files)
      }



      const files = value ? (Array.isArray(value) ? value.map((file) => file?.path || file) : [value]) : []

      const [fileProgress, setFileProgress] = useState({})
      const onFileProgress = (percentage, status, rawFile) => {
        console.log('onFile progress', percentage)
        const currentProgress = {}
        currentProgress[rawFile.path] = percentage
        setFileProgress({ ...fileProgress, ...currentProgress })

        return
        /*  if (percentage === 0) {
              setLoading(true)
          }
          if (percentage === 100) {
              setLoading(false)
          }
          setPercentage(percentage);*/
      }

      const onDrop = (newFiles, rejectedFiles, event) => {
        console.log('OnDrop', files)
        const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles]

        if (multiple) {
          onChange(transformFiles(updatedFiles))
        } else {
          onChange(transformFiles(updatedFiles[0]))
        }
        const token = Cookies.get('token')

        console.log('OnDrop', files)
        const options = {
          files: newFiles,
          signingUrlMethod: 'GET',
          accept: '*/*',
          uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
          signingUrlHeaders: {'Authorization': `Bearer ${token}`},
          signingUrlWithCredentials: false,
          signingUrlQueryParams: { uploadType: 'avatar' },
          autoUpload: true,
          onFinishS3Put: onFinishFileUpload,
          onProgress: onFileProgress,
          onError: onFileUploadError,
          signingUrl: `https://masters-pages.dev.glob-com.ru/api/s3/sign`,
          s3path: 'masters-pages/files',
          ...uploadOptions,
        }

        setTimeout(() => {
          new S3Upload(options)
        }, 300)

        // eslint-disable-line

        if (options.onDrop) {
          options.onDrop(newFiles, rejectedFiles, event)
        }
      }

      const onFileUploadError = (error) => {
        console.error('onFileUploadError', error)
      }
      const onRemove = file => () => {
        if (multiple) {
          const filteredFiles = files.filter(
                stateFile => !shallowEqual(stateFile, file),
            )
          onChange(filteredFiles as any)
        } else {
          onChange(null)
        }

        if (options.onRemove) {
          options.onRemove(file)
        }
      }
      const onFinishFileUpload = useCallback(
        (result, file) => {
          const newFile = result.fileKey
          let newFileList

          if (multiple) {
            const filteredFiles = files.filter(
                    stateFile => !shallowEqual(stateFile, file),
                )
            console.log('onFinishFileUpload', files, result.fileKey)

            newFileList = [...filteredFiles, newFile]
          } else {
            newFileList =  [newFile]
          }

          onChange(multiple ? newFileList : newFile)
        },
        [value, onChange, files],
    )



      const { getRootProps, getInputProps } = useDropzone({
        ...options,
        accept,
        maxSize,
        minSize,
        multiple,
        onDrop,
      })

      console.log('Files', files)
      return (
      <div className={`${styles.root} ${!!(files.length > 0) && styles.hasBackDrop}`}>

        <div className={styles.preview}>
          <div
            data-testid="dropzone"
            className={styles.dropZone}
            {...getRootProps()}
          >
            <AvatarAddFileBtn isLoading={!!(files.length > 0 && files[0].rawFile)} hasImage={files.length > 0 && !files[0].rawFile}/>
            <input
              {...getInputProps()}
            />

          </div>
          {(Array.isArray(files) ? files : [files]).map((file, index) => (
            <AvatarInputPreview
              key={index}
              file={file}
              loading={!!file.rawFile}
              progress={file && file.rawFile ? fileProgress[file.rawFile.path] || 0 : 0}
              onRemove={onRemove(file)}
            >
            </AvatarInputPreview>
          ))}
          {files.length > 0 && <div className={styles.backdrop}/>}
        </div>
        <div className={styles.info}>
          <div>Upload your photo</div>

          <div> Format allowed PNG and JPEG</div>

          <div> Minimal size: 180×180 px.</div>
          <div className={styles.infoActions}>
            <div className={styles.infoActionItem} onClick={handleChangePhoto}>Change photo <img src={'/img/icons/link-arrow-left.svg'} /></div>
            {files.length > 0 &&  <div className={styles.infoActionItem} onClick={handleDeletePhoto}>Delete photo <img src={'/img/icons/link-cross.svg'} /></div>}
          </div>
        </div>

        <ErrorInput {...props}/>
            </div>
      )
    }

AvatarInput.propTypes = {
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

export default AvatarInput
