import { createCatalog } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen } from "components/Modal/actions";
import ProjectForm from "pages/project/Form";
import { IRootState } from "types";
import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'

const CreateProject = (props) => {
    const dispatch = useDispatch()
    const tags = useSelector((state: IRootState) => state.tagCategory.list)
    const tagAll = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_FOR_ALL_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_FOR_ALL_TAG_NAME);
    const tagDepartment = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_DEPARTMENT_LIMITED_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_DEPARTMENT_LIMITED_TAG_NAME);
    const tagGuest = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_GUEST_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_GUEST_TAG_NAME);

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

        dispatch(confirmOpen({
            title: 'Вы уверены, что хотите создать проект?',
            description: data.name,
            confirmText: 'Создать',
            onConfirm: () => {
                dispatch(createCatalog({ ...data, entryType: 'project' }))
            }
        }));
    }

    return (
        <Layout>
            <Header {...props}/>
            <div className={styles.root}>
                <div className={styles.title}>Создание нового проекта</div>
                <div className={styles.main}><Link href="/">Главная</Link></div>
                <ProjectForm  user={props.user} onSubmit={handleSubmit} initialValues={{visibility: 'all'}}/>
            </div>
            <Footer/>
        </Layout>
    )
}

export const getServerSideProps = getAuthServerSide({redirect: true});
export default CreateProject
