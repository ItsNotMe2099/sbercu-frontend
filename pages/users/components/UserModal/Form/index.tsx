import { fetchTagCategoryListByName } from "components/tags/TagCategory/actions";
import Checkbox from "components/ui/Inputs/Checkbox";
import SelectInput from "components/ui/Inputs/SelectInput";
import SelectTagCategory from "components/ui/Inputs/SelectTagCategory";
import { fetchUserList } from "components/users/actions";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import { IRootState } from "types";
import { required } from "utils/validations";
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { modalClose } from 'components/Modal/actions'

let UserForm = props => {
  const { handleSubmit, initialValues } = props
    const tagCategory = useSelector((state: IRootState) => state.tagCategory.list)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTagCategoryListByName('Подразделения'));
    }, [])
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Field
            name="email"
            component={Input}
            label="Введите электронную почту"
            validate={required}
            disabled={!!initialValues.email}

        />
        <Field
            name="firstName"
            component={Input}
            label="Введите имя"
            validate={required}

        />
        <Field
            name="lastName"
            component={Input}
            label="Введите фамилию"
            validate={required}

        />
        <Field
            name="role"
            component={SelectInput}
            label="Роль"
            validate={required}
            options={[{label: 'Администратор', value: 'admin'}, {label: 'Менеджер', value: 'manager'}, {label: 'Пользователь', value: 'user'}, {label: 'Пользователь (Только свое подразделение)', value: 'limited_user'}, {label: 'Гость', value: 'guest'}]}

        />
        <Field
            name="departmentTagId"
            component={SelectInput}
            label="Выберите подразделение"
            options={tagCategory[0]?.tags.map((item) => {return {label: item.name, value: item.id}})}

        />

      <div className={styles.btnContainer}>
        {<Button green size="9px 16px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>}
            <Button transparent onClick={() => dispatch(modalClose())} type="button">Отменить</Button>
      </div>
    </form>
  )
}

UserForm = reduxForm ({
  form: 'userForm',
}) (UserForm)

export default UserForm
