import Basket from "components/svg/Basket";
import FileDataForm from "components/ui/Inputs/FilesUploadInput/components/FileDataForm";
import {Circle} from "rc-progress";
import React, { useEffect, ReactNode, FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Loader from 'react-loader-spinner'
import Cross from 'components/svg/Cross'
interface Props {
    className?: string
    progress?: number,
    loading?: boolean,
    onRemove: () => void
    file: any,
    key?: string
}

const ImageInputPreview: FunctionComponent<Props> = props => {
    const {

        className,
        onRemove,
        progress,
        loading,
        file,
        key,
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
        const srcValue =  file.preview;
        if (!srcValue) {
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
                    {loading && <div className={styles.overlay}/>}
                    {loading ?   <div className={styles.loader}><div className={styles.progressCircle}><Circle percent={progress} strokeWidth={4} strokeColor="#27AE60" trailColor={'#fff'} /> </div> <div className={styles.loaderProgress}>{props.progress}%</div></div>
                      :          file.rawFile ? <div className={styles.successArea}><div className={styles.statusIcon}><img src={'/img/icons/mark.svg'}/></div></div> : null}

                    <div className={styles.deleteButton} onClick={onRemove}>
                        <Cross/>
                    </div>
                </div>


            </div>
        </>
    )
}

ImageInputPreview.propTypes = {
    className: PropTypes.string,
    file: PropTypes.any,
    onRemove: PropTypes.func.isRequired,
}

ImageInputPreview.defaultProps = {
    file: undefined,
}

export default ImageInputPreview
