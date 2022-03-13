import Basket from "components/svg/Basket";
import FileDataForm from "components/ui/Inputs/FilesUploadInput/components/FileDataForm";
import {Circle} from "rc-progress";
import React, { useEffect, ReactNode, FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Loader from 'react-loader-spinner'
import {cleanMediaExtFileName} from 'utils/media'
interface Props {
    className?: string
    progress?: number,
    loading?: boolean,
    onRemove: () => void
    onChangeFileData: (FileEntity, data) => void
    file: any,
    key?: string
}

const FileInputPreview: FunctionComponent<Props> = props => {
    const {

        className,
        onRemove,
        progress,
        loading,
        file,
        onChangeFileData,
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
        const srcValue = file?.path || file.preview;
        if (!srcValue) {
            return;
        }
        return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.REACT_APP_API_URL || 'https://masters-pages.dev.glob-com.ru'}/api/s3/uploads/${srcValue}`)}`
    }
    const handleChangeForm = (data) => {
        onChangeFileData(file, data);
    }
    return (
        <>
            <div className={styles.root}>

                <div className={styles.status}>
                    {loading ?   <div className={styles.loader}><div className={styles.progressCircle}><Circle percent={progress} strokeWidth={4} strokeColor="#27AE60" /> </div> <div className={styles.loaderProgress}>{props.progress}%</div></div>
                        :           <div className={styles.statusIcon}><img src={'/img/icons/mark.svg'}/></div>}

                </div>
                <div className={styles.main}>
                    <div className={styles.topBar}>
                        <div className={styles.name}>
                            {cleanMediaExtFileName(file?.rawFile?.name)}
                        </div>
                        <div className={styles.deleteButton} onClick={onRemove}>

                            <Basket/>
                        </div>
                    </div>
                    <FileDataForm  form={`${file.key}-form`} initialValues={{name: cleanMediaExtFileName(file?.rawFile?.name)}} onChange={handleChangeForm}/>
                </div>
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
