import Checkbox from "components/ui/Inputs/Checkbox";
import SelectInput from "components/ui/Inputs/SelectInput";
import SelectTagCategory from "components/ui/Inputs/SelectTagCategory";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import { required } from "utils/validations";
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { modalClose } from 'components/Modal/actions'

let TagForm = props => {
  const { handleSubmit, initialValues } = props
  const dispatch = useDispatch()

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Field
            name="name"
            component={Input}
            label="Придумайте название тега"
            validate={required}
        />
        <Field
            name="tagCategoryId"
            component={SelectTagCategory}
            label="Выберите коллекцию"
            validate={required}
            options={[
                {label: '111', value: '1'},
                {label: '222', value: '2'},
                {label: '333', value: '3'},
                {label: '444', value: '4'}
                ]}
        />
        <Field
            name="visibleOnlyOwns"
            component={Checkbox}
            label="Видит только свои проекты"
        />
      <div className={styles.btnContainer}>
        {<Button green size="9px 16px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>}
            <Button transparent onClick={() => dispatch(modalClose())} type="button">Отменить</Button>
      </div>
    </form>
  )
}

TagForm = reduxForm ({
  form: 'tagForm',
}) (TagForm)

export default TagForm
