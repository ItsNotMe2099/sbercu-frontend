import AvatarInput from "components/ui/AvatarInput";
import SpeakersInputList from "components/ui/Inputs/SpeakersInputList";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { modalClose } from 'components/Modal/actions'

let FilePosterForm = props => {
  const { handleSubmit, initialValues } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldsWrapper}>
        <div className={styles.fields}>
        <Field
            name="poster"
            component={AvatarInput}
        />
        </div>
        </div>
      <div className={styles.btnContainer}>
        {/*value === '' ?
          <Button notActive textWhite size="9px 16px" type="button">Создать</Button>
          :*/
            <Button green size="9px 16px">{initialValues?.id ? 'Изменить' : 'Загрузить'}</Button>}
            <Button transparent onClick={() => dispatch(modalClose())} type="button">Отменить</Button>
      </div>
    </form>
  )
}

FilePosterForm = reduxForm ({
  form: 'filePoster',
}) (FilePosterForm)

export default FilePosterForm
