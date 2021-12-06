import React, { useEffect, ReactNode, FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import {Circle} from "rc-progress";
interface Props {
  className?: string
  progress?: number,
  loading?: boolean,
  onRemove: () => void
  file: any
}

const AvatarInputPreview: FunctionComponent<Props> = props => {
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
    const srcValue = file?.preview ? file.preview : file;
    if(!srcValue){
      return;
    }
    return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.NEXT_PUBLIC_API_URL || ''}/api/media/files/${srcValue}`)}`
  }
  return (
        <div className={styles.root}>
          <div className={styles.imageWrapper}>
            {loading && <div className={styles.fade}><div className={styles.loader}>
                <div className={styles.progressCircle}><Circle percent={progress} strokeWidth={4}
                                                               trailColor="#fff" strokeColor="#27AE60"/></div>
                <div className={styles.loaderProgress}>{props.progress}%</div>
            </div></div>}
           <img className={styles.image}
              src={getImageSrc(file)}
            />
          </div>


       </div>
  )
}

AvatarInputPreview.propTypes = {
  className: PropTypes.string,
  file: PropTypes.any,
  onRemove: PropTypes.func.isRequired,
}

AvatarInputPreview.defaultProps = {
  file: undefined,
}

export default AvatarInputPreview
