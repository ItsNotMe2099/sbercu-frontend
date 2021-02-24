import AvatarInput from "components/ui/AvatarInput";
import SpeakersInputList from "components/ui/Inputs/SpeakersInputList";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { modalClose } from 'components/Modal/actions'
import {IRootState} from "../../../types";

let MediaLinkForm = props => {
  const { handleSubmit, initialValues } = props
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldsWrapper}>
        <div className={styles.fields}>
        <Field
            name="expiredAt"
            component={Input}
            mask={'99.99.9999'}
            label={"Дата истечения"}
        />
        </div>
        </div>
      <div className={styles.btnContainer}>
        {/*value === '' ?
          <Button notActive textWhite size="9px 16px" type="button">Создать</Button>
          :*/
            <Button green size="9px 16px">{'Создать'}</Button>}
            <Button transparent onClick={() => dispatch(modalClose())} type="button">Отменить</Button>
      </div>
    </form>
  )
}

MediaLinkForm = reduxForm ({
  form: 'mediaLinkForm',
}) (MediaLinkForm)

export default MediaLinkForm
