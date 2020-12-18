import FilesUploadInput from "components/ui/Inputs/FilesUploadInput";
import { Field, reduxForm } from 'redux-form'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { modalClose } from 'components/Modal/actions'

let UploadFilesForm = props => {
  const { handleSubmit, initialValues } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="files"
        component={FilesUploadInput}
        label="Файлы"
        buttonSubmit={<Button green size="9px 16px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>}
        multiple={true}
      />
    </form>
  )
}

UploadFilesForm = reduxForm ({
  form: 'uploadFiles',
}) (UploadFilesForm)

export default UploadFilesForm
