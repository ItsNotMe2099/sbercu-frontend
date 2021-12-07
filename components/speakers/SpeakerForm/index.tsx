import TagInput from "components/ui/Inputs/TagInput";
import { useRouter } from "next/router";
import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import {IRootState, ITagCategoryType} from "types";
import styles from './index.module.scss'
import Input from 'components/ui/Inputs/Input'
import {email, required} from 'utils/validations'
import TextArea from 'components/ui/Inputs/TextArea'
import { RadioList } from 'components/ui/Inputs/RadioList'
import { useSelector, useDispatch } from 'react-redux'
import AvatarInput from "components/ui/AvatarInput";

let SpeakerForm = props => {
    const router = useRouter()
  const { handleSubmit, initialValues } = props
    const handleCancel = () => {
        router.back();
    }

    console.log("initialValues", initialValues)
  return (
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
            <div className={styles.section__mobile}>
              <div className={styles.title}>Тегирование</div>
              <div className={styles.border}></div>
              <div className={styles.tags}>
                <Field
                name="tagsIds"
                component={TagInput}
                categoryType={ITagCategoryType.Speaker}
                green
                />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>Описание</div>
              <div className={styles.border}></div>
              <div className={styles.desc}>
                <Field
                  name="name"
                  component={Input}
                  label="Имя"
                  autoFocus={!initialValues?.id}
                />
                <Field
                  name="nameEng"
                  component={Input}
                  label="Имя на английском"
                  autoFocus={!initialValues?.id}
                />
                <Field
                  name="legalEntity"
                  component={Input}
                  label="Юридической лицо (в 1С)"
                />
                <Field
                name="price"
                component={Input}
                label="Стоимость"
                />
                <Field
                name="languages"
                component={Input}
                label="Языки"
                />
                <div className={styles.textArea}>
                <div className={styles.head__right}>Краткое описание</div>
                <Field
                name="description"
                component={TextArea}
                label="Краткое описание"
                />
                <div className={styles.head__right}>Биография</div>
                <Field
                name="bio"
                component={TextArea}
                label="Биография"
                />
                <div className={styles.head__right}>Контакты спикера</div>
                <Field
                name="speakerContacts"
                component={TextArea}
                label="Контакты спикера"
                />
                <div className={styles.head__right}>Контакты агента</div>
                <Field
                name="agentContacts"
                component={TextArea}
                label="Контакты агента"
                />
                </div>
              </div>
            </div>
            <div className={styles.section__tags}>
              <div className={styles.title}>Тегирование</div>
              <div className={styles.border}></div>
              <div className={styles.tags}>
                <Field
                name="tagsIds"
                component={TagInput}
                categoryType={ITagCategoryType.Speaker}
                isIncludedCategory={(category) => category.name !== 'Видимость'}
                green
                />

              </div>
            </div>
            <div className={styles.section__cover}>
              <div className={styles.title}>Фото</div>
              <div className={styles.border}></div>
              <div className={styles.content}>
                <div className={styles.head}>Главное фото</div>
                <Field
                name="mainCover"
                component={AvatarInput}
                />
              </div>
            </div>
            </div>
            <div className={styles.btnContainer}>
              <Button green size="10px 26px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>
              <Button transparent textLightGrey type={'button'} onClick={handleCancel}>Отмена</Button>
            </div>
          </form>
  )
}



SpeakerForm = reduxForm ({
  form: 'speakerForm',
}) (SpeakerForm)


export default SpeakerForm
