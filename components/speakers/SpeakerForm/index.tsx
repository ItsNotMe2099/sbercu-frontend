import TagInput from "components/ui/Inputs/TagInput";
import {useRouter} from "next/router";
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import Button from 'components/ui/Button'
import {
  IRootState,
  ITagCategoryType,
  SpeakerPriceCurrencyList,
  SpeakerPricePrepareTypeList,
  SpeakerPriceTypeList
} from "types";
import styles from './index.module.scss'
import Input from 'components/ui/Inputs/Input'

import { useSelector, useDispatch } from 'react-redux'
import {
  email,
  phone,
  required,
  speakerContactsRequiredEmail,
  speakerContactsRequiredPhone,
  speakerPriceFieldRequired
} from 'utils/validations'
import TextArea from 'components/ui/Inputs/TextArea'
import AvatarInput from "components/ui/AvatarInput";
import InputPhone from 'components/ui/Inputs/InputPhone'
import cx from 'classnames'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import LanguageInputList from 'components/ui/Inputs/LanguageInputList'
import React, {useState} from 'react'
import FilesUploadInput from 'components/ui/Inputs/FilesUploadInput'
import ImagesUploadInput from 'components/ui/Inputs/ImagesUploadInput'
import {formatPhone} from 'utils/formatters'
import SelectInput from 'components/ui/Inputs/SelectInput'
import FormError from 'components/ui/Form/FormError'
import request from 'utils/request'
import {useThrottleFn} from '@react-cmpt/use-throttle'
import PricesDescriptionList from "components/ui/Inputs/PricesDescriptionList";

let SpeakerForm = props => {
  const router = useRouter()
  const formError = useSelector((state: IRootState) => state.speakers.formError)
  const loading = useSelector((state: IRootState) => state.speakers.formLoading)

  const {handleSubmit, initialValues, firstName, lastName, errors} = props

  const [firstNameEnTouched, setFirstNameEnTouched] = useState(false);
  const [lastNameEnTouched, setLastNameEnTouched] = useState(false);
  const [speakerExists, setSpeakerExists] = useState(false);
  const [uploadingGalleryInProgress, setUploadingGalleryInProgress] = useState(false);
  const handleCancel = () => {
    router.back();
  }
  const handleCheckName = async (firstName, lastName) => {
    setSpeakerExists(false)
    if(!firstName || !lastName){
      cancelCheckName()
      return;
    }
    const res = await request({
      url: `/api/speaker/search?query=${`${firstName ?? ''} ${lastName ?? ''}`.trim()}`,
      method: 'GET'
    });
    const exists = !!res.data.data.find(i => (!initialValues.id || parseInt(i.id, 10) !== initialValues.id)  && i.firstName === firstName && i.lastName === lastName)
    setSpeakerExists(exists)
  }
  const { callback: checkName, cancel: cancelCheckName, callPending: saveViewHistoryPending } = useThrottleFn(handleCheckName, 600)


  const handleChangeFirstName = (e) => {
      checkName(e.target.value, lastName)
    if (firstNameEnTouched) {
      return
    }

    props.change('firstNameEng', (new cyrillicToTranslit()).transform(e.target.value || ''));
  }
  const handleChangeLastName = (e) => {
    checkName(firstName, e.target.value)
    if (lastNameEnTouched) {
      return
    }
    props.change('lastNameEng', (new cyrillicToTranslit()).transform(e.target.value || ''));
  }
  const handleChangeFirstNameEng = (val) => {
    setFirstNameEnTouched(true)
  }
  const handleChangeLastNameEng = (val) => {
    setFirstNameEnTouched(true)
  }
  const handleSyncFiles = (files) => {
    if(files.filter(item => item.rawFile && !item.path).length > 0){
      setUploadingGalleryInProgress(true);
    }else{
      setUploadingGalleryInProgress(false);
    }
  }

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
          <div className={styles.title}>Общая информация</div>
          <div className={styles.border}></div>
          <div className={styles.desc}>
            <div className={styles.twoColumns}>
              <Field
                name="firstName"
                component={Input}
                label="Имя"
                autoFocus={!initialValues?.id}
                validate={required}
                onChange={handleChangeFirstName}
              />
              <Field
                name="lastName"
                component={Input}
                label="Фамилия"
                onChange={handleChangeLastName}
                validate={required}
                autoFocus={!initialValues?.id}
              />
            </div>
            {speakerExists && <FormError error={'Спикер с таким именем уже существует'}/>}

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
              label="Юридическое лицо в соответствии с 1С"
              validate={required}
            />
            <div className={styles.textArea}>
            <div className={styles.head__right}>Ценообразование</div>

              <Field
                  name="pricesExecute"
                  component={PricesDescriptionList}
                  label="Проведение без сопуствующих услуг"
                  nameOptions={SpeakerPriceTypeList}
              />
              <Field
                  name="pricesPrepare"
                  component={PricesDescriptionList}
                  label="Подготовка"
                  nameOptions={SpeakerPricePrepareTypeList}
              />

            </div>
            <div className={styles.textArea}>
              <div className={styles.head__right}>Должность / Проект/ Краткое описание деятельности</div>
              <Field
                name="description"
                component={TextArea}
                label="Должность / Проект/ Краткое описание деятельности"
                validate={required}
              />
              <div className={styles.head__right}>Награды / Регалии/ Принадлежность к бизнес-школам</div>
              <Field
                name="awards"
                component={TextArea}
                label="Награды / Регалии/ Принадлежность к бизнес-школам"
              />
              <div className={styles.head__right}>Биография</div>
              <Field
                name="bio"
                component={TextArea}
                label="Биография"
                validate={required}
              />
              <div className={styles.head__right}>Презентации / Книги/ Публикации</div>
              <Field
                name="publications"
                component={TextArea}
                label="Презентации / Книги/ Публикации"
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
                  format={formatPhone}
                  validate={speakerContactsRequiredPhone}

                />
                <Field
                  name="speakerContactEmail"
                  component={Input}
                  label="Email"
                  validate={speakerContactsRequiredEmail}
                />
              </div>
              <div className={cx(styles.head__right)}>Контакты агента</div>
              <div className={cx(styles.twoColumns, styles.formField)}>

                <Field
                  name="agentContactPhone"
                  component={InputPhone}
                  label="Телефон"
                  format={formatPhone}
                  validate={speakerContactsRequiredPhone}
                />
                <Field
                  name="agentContactEmail"
                  component={Input}
                  label="Email"
                  validate={speakerContactsRequiredEmail}
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
              validate={required}
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
              validate={required}

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
      <div style={{display: 'inline-block'}}><FormError error={errors?.speakers ?? ''}/></div>
      <FormError error={formError}/>
      <div className={styles.btnContainer}>
        <Button disabled={uploadingGalleryInProgress || loading} green size="10px 26px">{initialValues?.id ? 'Сохранить' : 'Создать'}</Button>
        <Button transparent textLightGrey type={'button'} disabled={loading} onClick={handleCancel}>Отмена</Button>
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
