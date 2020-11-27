import TagInput from "components/ui/Inputs/TagInput";
import { Field, reduxForm } from 'redux-form'
import Button from 'components/ui/Button'
import InputPassword from 'components/ui/Inputs/InputPassword'
import styles from './index.module.scss'
import Link from 'next/link'
import Input from 'components/ui/Inputs/Input'
import {email, required} from 'utils/validations'
import { useSelector } from 'react-redux'
import { IRootState } from 'types'
import TextArea from 'components/ui/Inputs/TextArea'
import TagCategory from 'components/tags/TagCategory'
import { RadioList } from 'components/ui/Inputs/RadioList'
import classNames from 'classnames';

let ProjectForm = props => {
  const { handleSubmit } = props
  return (
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
            <div className={styles.section}>
              <div className={styles.title}>Описание</div>
              <div className={styles.border}></div>
              <div className={styles.desc}>
                <Field
                name="name"
                component={Input}
                label="Название проекта"
                validate={required}
                />
                <Field
                name="projectManager"
                component={Input}
                label="ФИО менеджера проекта"
                validate={required}
                />
                <Field
                name="projectManagerMail"
                component={Input}
                label="е-почта менеджера"
                validate={required}
                />
                <div className={styles.textArea}>
                <div className={styles.head__right}>Описание проекта</div>
                <Field
                name="projectDescription"
                component={TextArea}
                label="Краткое описание проекта"
                validate={required}
                />
                <div className={styles.head__right}>Целевая аудитория</div>
                <Field
                name="projectAudience"
                component={TextArea}
                label="Для кого предназначена программа"
                validate={required}
                />
                <div className={styles.head__right}>Цель обучения</div>
                <Field
                name="projectTarget"
                component={TextArea}
                label="Цель обучения"
                validate={required}
                />
                <div className={styles.head__right}>Содержание программы</div>
                <Field
                name="projectContent"
                component={TextArea}
                label="Содержание программы"
                validate={required}
                />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>Тегирование</div>
              <div className={styles.border}></div>
              <div className={styles.tags}>
                <Field
                name="tagsIds"
                component={TagInput}
                green
                />

              </div>
            </div>
            <div>
              <div className={styles.title}>Отображение</div>
              <div className={styles.border}></div>
              <div className={styles.content}>
                <div className={styles.head}>Приватность</div>
                <Field
                name=' visibility'
                component={RadioList}
                label="Приватность"
                options={[{value: "all", label: "Видим для всех"}, {value: "guest", label: "Доступен для гостей"}]}
                />
              </div>
            </div>
            </div>
            <div className={styles.btnContainer}>
              <Button green size="12px 25px">Создать</Button>
              <Button transparent textLightGrey>Отмена</Button>
            </div>
          </form>
  )
}


ProjectForm = reduxForm ({
  form: 'projectForm',
}) (ProjectForm)

export default ProjectForm
