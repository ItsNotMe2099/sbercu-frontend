import Button from "components/ui/Button";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Welcome from 'components/svg/Welcome'
import { TagSelect } from "components/dashboard/TagSelect";

export default function Dashboard(props){
  return (
    <div className={styles.root}>
      <TagSelect categoryLabel="Подразделения"/>
      <TagSelect categoryLabel="Разделы"/>
      <TagSelect categoryLabel="Темы"/>
      <TagSelect categoryLabel="Обязтельность"/>
      <TagSelect categoryLabel="Форма обучения"/>
      <TagSelect categoryLabel="Компетенции"/>
      <TagSelect categoryLabel="Уровень менеджмента"/>
    </div>
  )
}


