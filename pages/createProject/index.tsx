import { createCatalog } from "components/catalog/actions";
import { confirmOpen } from "components/Modal/actions";
import ProjectForm from "pages/createProject/Form";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
const CreateProject = (props) => {
  const dispatch = useDispatch()

  const handleSubmit = (data) => {
    dispatch(confirmOpen({
      title: 'Вы уверены, что хотите создать проект?',
      description: data.name,
      confirmText: 'Создать',
      onConfirm: () => {
        dispatch(createCatalog({...data, entryType: 'project'}))
      }
    }));
  }
  return (
    <body className={styles.white}>
    <Header/>
    <div className={styles.root}>
      <div className={styles.title}>Создание нового проекта</div>
      <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
      <ProjectForm onSubmit={handleSubmit}/>
    </div>
    </body>
  )
}


export default withAuthSync(CreateProject)
