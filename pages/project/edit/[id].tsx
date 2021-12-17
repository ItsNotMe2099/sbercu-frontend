import { fetchCatalogItemRequest, updateCatalog} from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen } from "components/Modal/actions";
import { useRouter } from "next/router";
import ProjectForm from "pages/project/Form";
import { useEffect } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import {getAuthServerSide} from 'utils/auth'

const EditProject = (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const currentCatalogItem = useSelector((state: IRootState) => state.catalog.currentCatalogItem)
    const tags = useSelector((state: IRootState) => state.tagCategory.list)
    const tagAll = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_FOR_ALL_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_FOR_ALL_TAG_NAME);
    const tagDepartment = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_DEPARTMENT_LIMITED_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_DEPARTMENT_LIMITED_TAG_NAME);
    const tagGuest = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_GUEST_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_GUEST_TAG_NAME);


    useEffect(() => {
        dispatch(fetchCatalogItemRequest(parseInt(router.query.id as string, 10)))
    }, [router.query.id])
    const handleSubmit = (data) => {
        let tag;
        let toRemove = []
        switch (data.visibility) {
            case 'all':
                tag = tagAll
                toRemove = [tagDepartment, tagGuest];
                break;
            case 'department':
                tag = tagDepartment
                toRemove = [tagGuest, tagAll];
                break;
            case 'guest':
                tag = tagGuest
                toRemove = [tagDepartment, tagAll];
                break;
        }

        if (tag) {

            data.tagsIds = data.tagsIds.filter(tagId => !toRemove.map(tag => tag ? tag.id : -1).includes(tagId))
            if (!data.tagsIds.includes(tag.id)) {
                data.tagsIds.push(tag.id);
            }
        }
        dispatch(updateCatalog(parseInt(router.query.id as string, 10), data))
    }
    const getVisibility = () => {
        if(currentCatalogItem) {
            if (currentCatalogItem.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_FOR_ALL_TAG_NAME)) {
                return 'all'
            } else if (currentCatalogItem.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_DEPARTMENT_LIMITED_TAG_NAME)) {
                return 'department'
            } else if (currentCatalogItem.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_GUEST_TAG_NAME)) {
                return 'guest';
            }
        }
        return 'all'
    }
    console.log("getVisibility()", getVisibility(), props.user)
    return (
        <Layout>
        <Header {...props}/>
        <div className={styles.root}>
            <div className={styles.title}>Редактирование проекта</div>
            <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
            {currentCatalogItem && <ProjectForm user={props.user} onSubmit={handleSubmit} initialValues={{
                ...currentCatalogItem,
                tagsIds: currentCatalogItem.tags.map(item => item.id),
                visibility: getVisibility()
            }}/>}
        </div>
            <Footer/>
        </Layout>
    )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default EditProject;