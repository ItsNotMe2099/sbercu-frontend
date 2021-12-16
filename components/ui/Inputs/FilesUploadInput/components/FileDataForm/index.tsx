import FilesUploadInput from "components/ui/Inputs/FilesUploadInput";
import Input from "components/ui/Inputs/Input";
import SpeakersInputList from "components/ui/Inputs/SpeakersInputList";
import { Field, reduxForm } from 'redux-form'
import { required } from "utils/validations";
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { modalClose } from 'components/Modal/actions'

let FileDataForm = props => {
  const { handleSubmit, initialValues } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Field
            name="name"
            component={Input}
            label="Название"
            validate={required}
        />
        <Field
            name="presenters"
            component={SpeakersInputList}
            label="Спикер"
        />

    </form>
  )
}

FileDataForm = reduxForm ({
  form: 'file-data-form',
}) (FileDataForm)

export default FileDataForm
