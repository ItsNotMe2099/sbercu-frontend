import FilesUploadInput from "components/ui/Inputs/FilesUploadInput";
import { Field, reduxForm } from 'redux-form'
import { IRootState } from "types";
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { modalClose } from 'components/Modal/actions'

let UploadFilesForm = props => {
  const { handleSubmit, initialValues } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const currentCatalogItem = useSelector((state: IRootState) => state.catalog.currentCatalogItem)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="files"
        component={FilesUploadInput}
        label="Файлы"
        currentCatalogId={currentCatalogItem?.id}
        buttonSubmit={(files) =>  <Button disabled={files.filter(file => !file.path).length > 0} green size="9px 16px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>}
        multiple={true}
        filesFromDropZone={props.filesFromDropZone}
      />
    </form>
  )
}

UploadFilesForm = reduxForm ({
  form: 'uploadFiles',
}) (UploadFilesForm)

export default UploadFilesForm
