import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import { required } from "utils/validations";
import styles from 'components/catalog-page/components/PasteCatalogItem/Form/index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { modalClose } from 'components/Modal/actions'
import FormError from 'components/ui/Form/FormError'
import {IRootState} from 'types'

let PasteCatalogItemForm = props => {
  const { handleSubmit, initialValues } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const formError = useSelector((state: IRootState) => state.catalog.formError)
  const formLoading = useSelector((state: IRootState) => state.catalog.formLoading)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="name"
        component={Input}
        label="Новое название"
        value={value}
        onChange={() => setValue(value)}
        autoFocus={true}
        validate={required}
      />
      <FormError error={formError}/>
      <div className={styles.btnContainer}>
        {/*value === '' ?
          <Button notActive textWhite size="9px 16px" type="button">Создать</Button>
          :*/
            <Button green size="9px 16px" disabled={formLoading}>Перенести</Button>}
            <Button transparent onClick={() => dispatch(modalClose())} type="button">Отменить</Button>
      </div>
    </form>
  )
}

PasteCatalogItemForm = reduxForm ({
  form: 'PasteCatalogItemForm',
}) (PasteCatalogItemForm)

export default PasteCatalogItemForm