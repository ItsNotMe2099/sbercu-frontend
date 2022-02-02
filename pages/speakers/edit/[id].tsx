import { fetchCatalogItemRequest, updateCatalog} from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {IHeaderType, IRootState} from "types";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import {getAuthServerSide} from 'utils/auth'
import {fetchSpeakerItemRequest, updateSpeaker} from 'components/speakers/actions'
import SpeakerForm from 'components/speakers/SpeakerForm'

const EditSpeaker= (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const currentCatalogItem = useSelector((state: IRootState) => state.speakers.currentSpeakerItem)
    const tags = useSelector((state: IRootState) => state.tagCategory.list)


    useEffect(() => {
        console.log("fetchSpeakerItemRequest", router.query.id);
        dispatch(fetchSpeakerItemRequest(parseInt(router.query.id as string, 10), {showTags: '1'}))
    }, [router.query.id])
    const handleSubmit = (data) => {

        dispatch(updateSpeaker(parseInt(router.query.id as string, 10), {
            ...data,

            speakerContactPhone:data.speakerContactPhone === '+7' ? null : (data.speakerContactPhone ? data.speakerContactPhone?.replace(/[^\d]/g, '') : data.speakerContactPhone) ,
            agentContactPhone: data.agentContactPhone === '+7' ? null : (data.agentContactPhone ? data.agentContactPhone?.replace(/[^\d]/g, '') : data.agentContactPhone)
        }))
    }
    console.log(" currentCatalogItem.tags",  currentCatalogItem?.tags)
    console.log(" currentCatalogItem.tags2",  currentCatalogItem?.tags?.map(item => item.id) || [])

    return (
        <Layout>
        <Header {...props} type={IHeaderType.Speaker}/>
        <div className={styles.root}>
            <div className={styles.title}>Редактирование спикера</div>
            <div className={styles.main}><Link href="/">&lt; Главная</Link></div>
            {currentCatalogItem && <SpeakerForm user={props.user} onSubmit={handleSubmit} initialValues={{
                ...currentCatalogItem,
                tagsIds: currentCatalogItem.tags?.map(item => item.id) || [],
            }}/>}
        </div>
            <Footer/>
        </Layout>
    )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default EditSpeaker;
