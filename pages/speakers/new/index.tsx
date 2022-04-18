import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import {confirmOpen, modalClose} from "components/Modal/actions";
import {IHeaderType, IRootState} from "types";
import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import {useDispatch, useSelector} from 'react-redux'
import SpeakerForm from 'components/speakers/SpeakerForm'
import {createSpeaker} from 'components/speakers/actions'

const CreateSpeaker = (props) => {
    const dispatch = useDispatch()
    const tags = useSelector((state: IRootState) => state.tagCategory.list)
    const tagAll = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_FOR_ALL_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_FOR_ALL_TAG_NAME);
    const tagDepartment = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_DEPARTMENT_LIMITED_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_DEPARTMENT_LIMITED_TAG_NAME);
    const tagGuest = tags.find(tagCategory => tagCategory.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_GUEST_TAG_NAME))?.tags.find(tag => tag.name === process.env.NEXT_PUBLIC_GUEST_TAG_NAME);

    const handleSubmit = (data) => {

        dispatch(confirmOpen({
            title: 'Вы уверены, что хотите создать спикера?',
            description: data.name,
            confirmText: 'Создать',
            onConfirm: () => {
                dispatch(modalClose());
                dispatch(createSpeaker({ ...data,
                    speakerContactPhone: data.speakerContactPhone ? data.speakerContactPhone?.replace(/[^\d]/g, '') : data.speakerContactPhone ,
                    agentContactPhone: data.agentContactPhone ? data.agentContactPhone?.replace(/[^\d]/g, '') : data.agentContactPhone
                }))
            }
        }));
    }

    return (
        <Layout>
            <Header {...props} type={IHeaderType.Speaker}/>
            <div className={styles.root}>
                <div className={styles.title}>Создание нового спикера</div>
                <div className={styles.main}><Link href="/">Главная</Link></div>
                <SpeakerForm  user={props.user} onSubmit={handleSubmit} initialValues={{visibility: 'all'}}/>
            </div>
            <Footer/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const authRes = (await getAuthServerSide({redirect: true})(ctx)) as any
    if (!authRes?.props?.user) {
        return authRes;
    }

    if(authRes?.props?.user === 'guest'){
        return {
            notFound: true
        }
    }

    return {
        props: {...authRes?.props},
    }

}
export default CreateSpeaker
