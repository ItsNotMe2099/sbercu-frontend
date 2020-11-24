import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'

let CreateFolderForm = props => {
  const { handleSubmit } = props
  const [value, setValue] = useState('')

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="name"
        component={Input}
        label="Название папки"
        value={value}
        onChange={() => setValue(value)}
      />
      <div className={styles.btnContainer}>
        {/*value === '' ?
          <Button notActive textWhite size="9px 16px" type="button">Создать</Button>
          :*/
          <Button green size="9px 16px">Создать</Button>}
      </div>
    </form>
  )
}

CreateFolderForm = reduxForm ({
  form: 'createFolder',
}) (CreateFolderForm)

export default CreateFolderForm
