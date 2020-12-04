import React, { useEffect, ReactNode, FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
interface Props {
  className?: string
  progress?: number,
  loading?: boolean,
  onRemove: () => void
  file: any,
}

const FileInputPreview: FunctionComponent<Props> = props => {
  const {

        className,
        onRemove,
        progress,
    loading,
        file,
        ...rest
    } = props

  useEffect(() => {
    return () => {
      const preview = file && file.rawFile ? file.rawFile.preview : file.preview
      if (preview) {
        window.URL.revokeObjectURL(preview)
      }
    }
  }, [file])

  const getImageSrc = (file) => {

    const srcValue = file?.path || file.preview;
    if(!srcValue){
      return;
    }
    return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.REACT_APP_API_URL || 'https://masters-pages.dev.glob-com.ru'}/api/s3/uploads/${srcValue}`)}`
  }
  return (
    <>
        <div className={styles.root}>

          <div className={styles.image}>
            <img
              src={getImageSrc(file)}
            />
          </div>
       </div>
       <div className={styles.btn}>
        <Button transparent textDarkGrey brdrDarkGrey size="9px 20px" type="button" onClick={onRemove}>Удалить</Button>
      </div>
       </>
  )
}

FileInputPreview.propTypes = {
  className: PropTypes.string,
  file: PropTypes.any,
  onRemove: PropTypes.func.isRequired,
}

FileInputPreview.defaultProps = {
  file: undefined,
}

export default FileInputPreview
