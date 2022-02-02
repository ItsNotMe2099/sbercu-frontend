import SpeakersInputList from "components/ui/Inputs/SpeakersInputList";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { modalClose } from 'components/Modal/actions'
import TextArea from 'components/ui/Inputs/TextArea'
import RatingInput from 'components/ui/Inputs/RatingInput'
import {required} from 'utils/validations'
import {IRootState} from 'types'
import { useSelector } from 'react-redux'
import FormError from 'components/ui/Form/FormError'

let SpeakerReviewForm = props => {
  const { handleSubmit, initialValues } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const formLoading = useSelector((state: IRootState) => state.speakers.formLoading)
  const formError = useSelector((state: IRootState) => state.speakers.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.label}>Поставьте оценку</div>
      <Field
        name="mark"
        component={RatingInput}
        label="Поставьте оценку"
        validate={required}
        value={value}
      />
      <div className={styles.label}>Напишите комментарий</div>
      <Field
        name="description"
        component={TextArea}
        label="..."
        value={value}
        onChange={() => setValue(value)}
        autoFocus={!initialValues?.id}
        validate={required}
      />

      <FormError error={formError}/>
      <div className={styles.btnContainer}>
            <Button green size="9px 16px" disabled={formLoading}>{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>
            <Button transparent onClick={() => dispatch(modalClose())} type="button">Отменить</Button>
      </div>
    </form>
  )
}

SpeakerReviewForm = reduxForm ({
  form: 'speakerReviewForm',
}) (SpeakerReviewForm)

export default SpeakerReviewForm
