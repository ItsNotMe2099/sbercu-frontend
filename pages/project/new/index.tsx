import { createCatalog } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen } from "components/Modal/actions";
import ProjectForm from "pages/project/Form";
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
    <Layout>
    <Header/>
    <div className={styles.root}>
      <div className={styles.title}>Создание нового проекта</div>
      <div className={styles.main}><Link href="/">Главная</Link></div>
      <ProjectForm onSubmit={handleSubmit}/>
    </div>
      <Footer/>
    </Layout>
  )
}


export default withAuthSync(CreateProject)
