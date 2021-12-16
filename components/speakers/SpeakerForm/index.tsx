import TagInput from "components/ui/Inputs/TagInput";
import {useRouter} from "next/router";
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import Button from 'components/ui/Button'
import {IRootState, ITagCategoryType} from "types";
import styles from './index.module.scss'
import Input from 'components/ui/Inputs/Input'
import {email, phone, required} from 'utils/validations'
import TextArea from 'components/ui/Inputs/TextArea'
import AvatarInput from "components/ui/AvatarInput";
import InputPhone from 'components/ui/Inputs/InputPhone'
import cx from 'classnames'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import LanguageInputList from 'components/ui/Inputs/LanguageInputList'
import {useState} from 'react'
import FilesUploadInput from 'components/ui/Inputs/FilesUploadInput'
import ImagesUploadInput from 'components/ui/Inputs/ImagesUploadInput'

let SpeakerForm = props => {
  const router = useRouter()

  const {handleSubmit, initialValues, firstName, lastName} = props
  const [firstNameEnTouched, setFirstNameEnTouched] = useState(false);
  const [lastNameEnTouched, setLastNameEnTouched] = useState(false);
  const [uploadingGalleryInProgress, setUploadingGalleryInProgress] = useState(false);
  const handleCancel = () => {
    router.back();
  }
  const handleChangeFirstName = (e) => {

    if (firstNameEnTouched) {
      return
    }
    props.change('firstNameEng', (new cyrillicToTranslit()).transform(e.target.value || ''));
  }
  const handleChangeLastName = (e) => {
    if (lastNameEnTouched) {
      return
    }
    console.log("ChangeLastName",  `${firstName || ''} ${e.target.value || ''}`);
    props.change('lastNameEng', (new cyrillicToTranslit()).transform(e.target.value || ''));
  }
  const handleChangeFirstNameEng = (val) => {
    setFirstNameEnTouched(true)
  }
  const handleChangeLastNameEng = (val) => {
    setFirstNameEnTouched(true)
  }
  const handleSyncFiles = (files) => {
    console.log("handleSyncFiles", files.filter(item => item.rawFile && !item.path).length  )
    if(files.filter(item => item.rawFile && !item.path).length > 0){
      setUploadingGalleryInProgress(true);
    }else{
      setUploadingGalleryInProgress(false);
    }
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
            <div className={styles.twoColumns}>
              <Field
                name="firstName"
                component={Input}
                label="Имя"
                autoFocus={!initialValues?.id}
                onChange={handleChangeFirstName}
              />
              <Field
                name="lastName"
                component={Input}
                label="Фамилия"
                onChange={handleChangeLastName}
                autoFocus={!initialValues?.id}
              />
            </div>

            <div className={cx(styles.twoColumns, styles.withMargin)}>
              <Field
                name="firstNameEng"
                component={Input}
                label="Имя на английском"
                autoFocus={!initialValues?.id}
                onChange={handleChangeFirstNameEng}
              />
              <Field
                name="lastNameEng"
                component={Input}
                label="Фамилия на английском"
                onChange={handleChangeLastNameEng}
                autoFocus={!initialValues?.id}
              />
            </div>

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
              <div className={styles.head__right}>Языки</div>
              <div className={cx(styles.twoColumns, styles.formField)}>

                <Field
                  name="languages"
                  component={LanguageInputList}
                  label="Выберите язык"
                />
              </div>
              <div className={styles.head__right}>Контакты спикера</div>
              <div className={cx(styles.twoColumns, styles.formField)}>

                <Field
                  name="speakerContactPhone"
                  component={InputPhone}
                  label="Телефон"
                  validate={phone}
                />
                <Field
                  name="speakerContactEmail"
                  component={Input}
                  label="Email"
                  validate={email}
                />
              </div>
              <div className={cx(styles.head__right)}>Контакты агента</div>
              <div className={cx(styles.twoColumns, styles.formField)}>

                <Field
                  name="agentContactPhone"
                  component={InputPhone}
                  label="Телефон"
                  validate={phone}
                />
                <Field
                  name="agentContactEmail"
                  component={Input}
                  label="Email"
                  validate={email}
                />
              </div>
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
              addFileTitle={'Загрузить фото'}
            />
            <div className={styles.head}>Галерея</div>

            <Field
              name="cover"
              component={ImagesUploadInput}
              label="Файлы"
              onSyncFiles={handleSyncFiles}
               multiple={true}
              filesFromDropZone={props.filesFromDropZone}
            />
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button disabled={uploadingGalleryInProgress} green size="10px 26px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>
        <Button transparent textLightGrey type={'button'} onClick={handleCancel}>Отмена</Button>
      </div>
    </form>
  )
}


SpeakerForm = reduxForm({
  form: 'speakerForm',
})(SpeakerForm)


const selector = formValueSelector('speakerForm')
SpeakerForm = connect(state => {
    const firstName = selector(state, 'firstName')
    const lastName = selector(state, 'lastName')

    return {firstName, lastName}
  }
)(SpeakerForm)
export default SpeakerForm
