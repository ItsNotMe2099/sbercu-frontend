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

let ProjectForm = props => {
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
                categoryType={ITagCategoryType.Project}
                disabled={props.user?.role !== 'admin'}
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
                label="Название проекта"
                autoFocus={!initialValues?.id}
                validate={required}
                />
                <Field
                name="projectManager"
                component={Input}
                disabled={props.user?.role !== 'admin'}
                label="ФИО менеджера проекта"
                validate={required}
                />
                <Field
                name="projectManagerMail"
                component={Input}
                disabled={props.user?.role !== 'admin'}
                label="е-почта менеджера"
                validate={required}
                />
                <div className={styles.textArea}>
                <div className={styles.head__right}>Описание проекта</div>
                <Field
                name="projectDescription"
                component={TextArea}
                disabled={props.user?.role !== 'admin'}
                label="Краткое описание проекта"
                validate={required}
                />
                <div className={styles.head__right}>Целевая аудитория</div>
                <Field
                name="projectAudience"
                component={TextArea}
                disabled={props.user?.role !== 'admin'}
                label="Для кого предназначена программа"
                validate={required}
                />
                <div className={styles.head__right}>Цель обучения</div>
                <Field
                name="projectTarget"
                disabled={props.user?.role !== 'admin'}
                component={TextArea}
                label="Цель обучения"
                validate={required}
                />
                <div className={styles.head__right}>Содержание программы</div>
                <Field
                name="projectContent"
                disabled={props.user?.role !== 'admin'}
                component={TextArea}
                label="Содержание программы"
                validate={required}
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
                disabled={props.user?.role !== 'admin'}
                component={TagInput}

                categoryType={ITagCategoryType.Project}
                isIncludedCategory={(category) => category.name !== 'Видимость'}
                green
                />

              </div>
            </div>
            <div className={styles.section__cover}>
              <div className={styles.title}>Отображение</div>
              <div className={styles.border}></div>
              <div className={styles.content}>
                <div className={styles.head}>Приватность</div>
                <Field
                name='visibility'
                disabled={props.user?.role !== 'admin'}
                component={RadioList}
                label="Приватность"
                validate={required}
                options={[{value: "all", label: "Видим для всех"},{value: "department", label: "Доступен для подразделений"}, {value: "guest", label: "Доступен для гостей"}]}
                />
                <div className={styles.head}>Обложка</div>
                <Field
                name="projectCover"
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



ProjectForm = reduxForm ({
  form: 'projectForm',
}) (ProjectForm)


export default ProjectForm
