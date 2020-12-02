import { createCatalog, fetchCatalogItem, updateCatalog } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen } from "components/Modal/actions";
import { useRouter } from "next/router";
import ProjectForm from "pages/project/Form";
import { useEffect } from "react";
import { IRootState } from "types";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'

const EditProject = (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const currentCatalogItem = useSelector((state: IRootState) => state.catalog.currentCatalogItem)

    useEffect(() => {
        dispatch(fetchCatalogItem(parseInt(router.query.id as string, 10)))
    }, [router.query.id])
    const handleSubmit = (data) => {
        dispatch(updateCatalog(parseInt(router.query.id as string, 10), data))
    }
    return (
        <Layout>
        <Header/>
        <div className={styles.root}>
            <div className={styles.title}>Редактирование проекта</div>
            <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
            {currentCatalogItem && <ProjectForm onSubmit={handleSubmit} initialValues={{
                ...currentCatalogItem,
                tagsIds: currentCatalogItem.tags.map(item => item.id)
            }}/>}
        </div>
            <Footer/>
        </Layout>
    )
}

export default withAuthSync(EditProject);
