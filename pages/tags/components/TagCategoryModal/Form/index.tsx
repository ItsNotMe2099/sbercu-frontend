import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import { required } from "utils/validations";
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { modalClose } from 'components/Modal/actions'

let TagCategoryForm = props => {
  const { handleSubmit, initialValues } = props
  const dispatch = useDispatch()

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="name"
        component={Input}
        label="Придумайте название коллекции"
        validate={required}
      />
      <div className={styles.btnContainer}>
        {<Button green size="9px 16px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>}
            <Button transparent onClick={() => dispatch(modalClose())} type="button">Отменить</Button>
      </div>
    </form>
  )
}

TagCategoryForm = reduxForm ({
  form: 'tagCategoryForm',
}) (TagCategoryForm)

export default TagCategoryForm
