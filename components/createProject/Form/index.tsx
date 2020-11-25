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

let ProjectForm = props => {
  const { handleSubmit } = props
  return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.desc}>
              <div className={styles.head}>
                <span>Описание</span>
              </div>
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
              <Field
              name="projectDescription"
              component={TextArea}
              label="Краткое описание проекта"
              title="Описание проекта"
              validate={required}
              />
              <Field
              name="projectAudience"
              component={TextArea}
              label="Для кого предназначена программа"
              title="Целевая аудитория"
              validate={required}
              />
              <Field
              name="projectTarget"
              component={TextArea}
              label="Цель обучения"
              title="Цель обучения"
              validate={required}
              />
              <Field
              name="projectContent"
              component={TextArea}
              label="Содержание программы"
              title="Содержание программы"
              validate={required}
              />
              <div className={styles.btnContainer}>
                <Button green size="12px 15px">Создать</Button>
                <Button transparent textLightGrey>Отмена</Button>
              </div>
            </div>
            <div className={styles.tags}>
              <div className={styles.head}>
                <span>Тегирование</span>
              </div>
              <Field
              name="tagsIds"
              component={TagCategory}
              />
            </div>
            <div className={styles.visual}>
              <div className={styles.head}>
                <span>Отображение</span>
              </div>
            </div>
          </form>
  )
}


ProjectForm = reduxForm ({
  form: 'projectForm',
}) (ProjectForm)

export default ProjectForm
