import { fetchCatalogList, setCatalogPage } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, modalClose, tagModalOpen, userModalOpen } from "components/Modal/actions";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {IJob, IRootState, ITag, IUser} from "types";
import {getAuthServerSide, logout} from "utils/auth";
import styles from './index.module.scss'
import Header from "components/layout/Header";
import { useSelector, useDispatch } from 'react-redux'
import UsersLoader from "components/ContentLoaders/usersLoader";
import cx from 'classnames';
import {
    cancelJob,
    deleteJob,
    fetchJobList,
    fetchJobListByIds,
    resetJobList,
    setJobListPage
} from "components/jobs/actions";
import JobListRow from "components/JobListRow";
import useInterval from 'react-useinterval';

const Jobs = (props) => {
    const dispatch = useDispatch()
    const jobs = useSelector((state: IRootState) => state.jobs.list)
    const total = useSelector((state: IRootState) => state.jobs.listTotal)
    const loading = useSelector((state: IRootState) => state.jobs.listLoading)
    const page = useSelector((state: IRootState) => state.jobs.page)
    const updateIds = useSelector((state: IRootState) => state.jobs.updateIds)

    const [isInit, setIsInit] = useState(true)
    const limit = 30;
    useInterval(() => {
        if(updateIds.length > 0){
            dispatch(fetchJobListByIds(updateIds));
        }

    }, 3000);
    const handleScrollNext = () => {
        dispatch(setJobListPage(page + 1));
        fetchList({page: page + 1});
    }
    useEffect(() => {
        dispatch(resetJobList());
        fetchList({page: 1});
    }, [])


    const fetchList = (data: any = {}) => {
         dispatch(fetchJobList({    page , limit,...data}))

    }
    const handleCancelJob = (item: IJob) => {
        dispatch(confirmOpen({
            title: 'Вы уверены, что хотите отменить задачу?',
            description: `ID задачи: ${item.id}`,
            confirmColor: 'red',
            confirmText: 'Отменить',
            onConfirm: () => {
                dispatch(cancelJob(item.id));
            }
        }));
    }
    const handleDeleteJob = (item: IJob) => {
        dispatch(confirmOpen({
            title: 'Вы уверены, что хотите удалить задачу?',
            description: `ID задачи: ${item.id}`,
            confirmColor: 'red',
            confirmText: 'Удалить',
            onConfirm: () => {
                dispatch(deleteJob(item.id));
            }
        }));
    }


    return (
        <Layout>
            <Header {...props}/>
            <div className={styles.root}>

                        <div className={styles.title}>Задания</div>
                        {loading && total === 0 ? <UsersLoader showFilters={false}/> :
                            <InfiniteScroll
                                dataLength={jobs.length + 1}
                                next={handleScrollNext}
                                loader={<div></div>}

                                style={{ overflow: "inherit" }}
                                hasMore={total !== jobs.length}
                                className={styles.table}
                            >
                                <div className={styles.tr}>
                                    <div className={cx(styles.td, styles.tdId)}>ID</div>
                                    <div className={styles.td}>Файл</div>

                                    <div className={styles.td} >Пользователь</div>
                                    <div className={styles.td} >Статистика</div>
                                    <div className={styles.td}></div>
                                 </div>
                                {jobs.map(job => <JobListRow job={job} onDeleteClick={handleDeleteJob}
                                                                onCancelClick={handleCancelJob}/>)}
                            </InfiniteScroll>
                        }

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

    if(authRes?.props?.user?.role !== 'admin'){
        return {
            notFound: true
        }
    }

    return {
        props: {...authRes?.props},
    }

}
export default Jobs
